'use strict';

const assert = require('assert');
const { LRUCache } = require('../src/lruCacheWExpiration');

console.log('Running LRUCache with expiration tests... \n');

// Test 1: Basic get and put operations
{
  const cache = new LRUCache(2);
  cache.put(1, 10);
  cache.put(2, 20);
  assert.strictEqual(cache.get(1), 10, 'Should retrieve value for key 1');
  assert.strictEqual(cache.get(2), 20, 'Should retrieve value for key 2');
  console.log('Test 1 passed: basic get and put');
}

// Test 2: LRU eviction, least recently used is evicted when capacity is reached
{
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  cache.put(3, 3); // evicts key 1 (LRU)
  assert.strictEqual(cache.get(1), -1, 'Key 1 should have been evicted');
  assert.strictEqual(cache.get(3), 3, 'Key 3 should exist');
  console.log('Test 2 passed: LRU eviction');
}


// Test 3: Accessing a key promotes it, so a different key gets evicted
{
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  cache.get(1); // promotes key 1 — now key 2 is LRU
  cache.put(3, 3); // evicts key 2
  assert.strictEqual(cache.get(2), -1, 'Key 2 should have been evicted');
  assert.strictEqual(cache.get(1), 1, 'Key 1 should still exist');
  assert.strictEqual(cache.get(3), 3, 'Key 3 should exist');
  console.log('Test 3 passed: access promotes recency');
}

// Test 4: Updating an existing key should not increase size
{
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  cache.put(1, 100); // update key 1 should not evict anything
  assert.strictEqual(cache.get(1), 100, 'Key 1 should have updated value');
  assert.strictEqual(cache.get(2), 2, 'Key 2 should still exist');
  console.log('Test 4 passed: updating existing key');
}

// Test 5: TTL expiration, entry should expire after the given time
{
  const cache = new LRUCache(2);
  cache.put(1, 1, 50); // expires in 50ms

  // Immediately the entry should still be available
  assert.strictEqual(cache.get(1), 1, 'Key 1 should be available before expiry');

  // Wait for expiration, then check
  setTimeout(() => {
    assert.strictEqual(cache.get(1), -1, 'Key 1 should have expired after 50ms');
    console.log('Test 5 passed: TTL expiration');

    runNextTests();
  }, 80);
}

function runNextTests() {
  // Test 6: Entry without TTL should never expire
  {
    const cache = new LRUCache(2);
    cache.put(1, 1); // no TTL
    assert.strictEqual(cache.get(1), 1, 'Entry without TTL should persist');
    console.log('Test 6 passed: no TTL means no expiration');
  }

  // Test 7: Capacity of 0, nothing should be stored
  {
    const cache = new LRUCache(0);
    cache.put(1, 1);
    assert.strictEqual(cache.get(1), -1, 'Cache with capacity 0 should store nothing');
    console.log('Test 7 passed: capacity 0 stores nothing');
  }

  // Test 8: Negative capacity, treated as invalid, behaves like capacity 0
  {
    const cache = new LRUCache(-5);
    cache.put(1, 1);
    assert.strictEqual(cache.get(1), -1, 'Negative capacity should store nothing');
    console.log('Test 8 passed: negative capacity stores nothing');
  }
  

  // Test 9: Negative TTL should be treated as no expiration
  {
    const cache = new LRUCache(2);
    cache.put(1, 1, -1000); // negative TTL -> no expiration
    assert.strictEqual(cache.get(1), 1, 'Negative TTL should not cause immediate expiry');
    console.log('Test 9 passed: negative TTL treated as no expiration');
  }

  // Test 10: Non-existent key returns -1
  {
    const cache = new LRUCache(2);
    assert.strictEqual(cache.get(99), -1, 'Non-existent key should return -1');
    console.log('Test 10 passed: non-existent key returns -1');
  }

  // Test 11: Example from the file
  {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2, 1000);
    assert.strictEqual(cache.get(1), 1);
    assert.strictEqual(cache.get(2), 2);
    cache.put(3, 3); // evicts key 1 (key 2 was accessed more recently)
    assert.strictEqual(cache.get(1), -1, 'Key 1 should be evicted');
    console.log('Test 11 passed: problem statement example');
  }

  // Test 12: String keys should work
  {
    const cache = new LRUCache(2);
    cache.put('a', 'hello');
    cache.put('b', 'world');
    assert.strictEqual(cache.get('a'), 'hello');
    assert.strictEqual(cache.get('b'), 'world');
    console.log('Test 12 passed: string keys');
  }
}
