# Nixplay Backend Engineer Coding Exam

## Project Structure
```
src/
    kthLargestElement.js        - Task 1: Implement an Efficient Kth Largest Element finder  
    lruCacheWExpiration.js      - Task 2: Design an LRU Cache with Expiration
tests/
    kthLargestElement.test.js   - Unit tests for task 1
    lruCacheWExpiration.test.js  - Unit tests for task 2
```

## Prerequisites
- Node.js (v16 or higher)

## Run the tests
No dependencies are required, only node.js built in modules are used

```
clone the repository
git clone https://github.com/jpdevera/nixplay-backend-coding-exam.git
cd to root directory
node tests/kthLargestElement.test.js
node tests/lruCacheWExpiration.test.js
```

## To run manually the Task

```
go to node REPL and run the specific method/class 

- for kthLargestElement
bash > node
const { findKthLargest } = require('./src/kthLargestElement'); 
findKthLargest([3, 2, 1, 5, 6, 4], 2)

- for LRUCache
bash > node
const { LRUCache } = require('./src/lruCacheWExpiration'); 
const cache = new LRUCache(2);
cache.put(1,1)
cache.put(2,2,50)
cache.get(1)
cache.get(2)

```