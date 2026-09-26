

class LRUCache {
    constructor(capacity) {
        if (typeof capacity !== 'number' || capacity <= 0) {
            throw new Error("Capacity must be a positive integer.");
        }
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        else if (this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value; // LRU key
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, value);
    }
}

// Alias for assignment requirement Cache(capacity)
const Cache = LRUCache;

// টাস্কে দেওয়া উদাহরণের টেস্ট কেস Execution:

console.log("=== LRU Cache Terminal Output ===");
const cache = new Cache(2);

cache.put("A", 10);
cache.put("B", 20);

console.log(cache.get("A")); // আউটপুট: 10
cache.put("C", 30);          // B মুছে যাবে (Evicted)
console.log(cache.get("B")); // আউটপুট: -1
console.log(cache.get("C")); // আউটপুট: 30
console.log(cache.get("A")); // আউটপুট: 10

// CommonJS and ES Module support
if (typeof module !== 'undefined') {
    module.exports = { LRUCache, Cache };
}
