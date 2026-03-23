'use strict';

/** 
 * LRU Cache implmentation with optional expiration time
 * 
 * I use a doubly linked list to maintain the order of usage and a Map for O(1) access to cache entries.
 * Each cache entry can have an optional TTL (time to live) that specifies how long the entry should be considered valid.
 */
class LRUCache {
    /**
     * @param {number} capacity - max entries the cache can hold
     */
    constructor(capacity) {
        this.capacity = (typeof capacity === 'number' && capacity > 0 && Number.isInteger(capacity)) 
            ? capacity 
            : 0;
        this.map = new Map();
        
        // Dummy head and tail nodes to simplify add/remove operations
        this.head = { key: null, value: null, prev: null, next: null };
        this.tail = { key: null, value: null, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * Removes a node from the linked list
     * @param {Object} node - The node to remove
     */
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    /**
     * Adds a node right after the head (most recently used position)
     * @param {Object} node - The node to add
     */
    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /**
     * Retrieves the value of the key if it exists and not expired else returns -1
     * @param {number} key - The key to retrieve
     * 
     * @return {number} - The value associated with the key or -1 if not found/expired
     */
    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }

       const node = this.map.get(key);

        //expiration check
        if (node.expiresAt != null && Date.now() >= node.expiresAt) {
            this._remove(node);
            this.map.delete(key);
            return -1;
        }

        // move to front, most recently used
        this._remove(node);
        this._addToFront(node);
        return node.value;
    }
    
    /**
     * Inserts or updates the value of the key with optional TTL (time to live)
     * @param {number} key - The key to insert/update
     * @param {number} value - The value to associate with the key
     * @param {number} ttl - Optional time to live in milliseconds for the cache entry
     */
    put(key, value, ttl) {
        if (this.capacity <= 0) {
            return;
        }

        const expiresAt = (typeof ttl === 'number' && ttl > 0) ? Date.now() + ttl : null;
        
        // Update existing key
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;
            node.expiresAt = expiresAt;
            this._remove(node);
            this._addToFront(node);
        } 

        // Evict LRU key if at capacitty
        if (this.map.size >= this.capacity) {
            const lruNode = this.tail.prev;
            this._remove(lruNode);
            this.map.delete(lruNode.key);
        }

        // Add new key
        const newNode = { key, value, expiresAt, prev: null, next: null };
        this._addToFront(newNode);
        this.map.set(key, newNode);
    }
}

module.exports = { LRUCache };