# Least Recently Used (LRU) Cache Implementation

A high-performance **Least Recently Used (LRU) Cache** implementation in JavaScript with $\mathcal{O}(1)$ average time complexity for both `get()` and `put()` operations.

---

## 📌 Features

- **$\mathcal{O}(1)$ Time Complexity**: Both `get(key)` and `put(key, value)` operate in average $\mathcal{O}(1)$ time.
- **Strict Capacity Enforcement**: Validates positive integer capacity ($> 0$) and evicts the least recently used item when capacity is exceeded.
- **MRU Ordering**: Accessing a key with `get()` or updating with `put()` immediately moves the key to the Most Recently Used (MRU) position.
- **Zero External Dependencies**: Pure JavaScript implementation using built-in `Map`.

---

## 🏗️ Data Structures Used & Why

This implementation uses **JavaScript's built-in `Map`** data structure.

### Why JavaScript `Map`?
In modern JavaScript engines (ECMAScript specification), a `Map` maintains keys in **insertion order**:
1. **MRU Maintenance**: When a key is accessed or updated, calling `cache.delete(key)` followed by `cache.set(key, value)` removes and re-inserts the key at the **end** of the `Map` in $\mathcal{O}(1)$ average time. The end of the `Map` represents the **Most Recently Used (MRU)** item.
2. **LRU Eviction**: The first item in the `Map` (`cache.keys().next().value`) represents the **Least Recently Used (LRU)** item. Retrieving and deleting this first key runs in $\mathcal{O}(1)$ average time.

---

## 🔄 How LRU Ordering is Maintained

1. **`get(key)`**:
   - Checks if `key` exists in `cache`. If not, returns `-1`.
   - If `key` exists, retrieves its `value`, deletes `key`, and re-inserts `cache.set(key, value)`.
   - This moves `key` to the end (MRU) and returns `value`.

2. **`put(key, value)`**:
   - If `key` already exists in `cache`, deletes it to prepare for re-insertion at the MRU position.
   - Else if `cache.size >= capacity`, gets the LRU key (`cache.keys().next().value`) and deletes it.
   - Inserts `cache.set(key, value)` at the MRU position.

---

## ⏱️ Time & Space Complexity

| Operation | Time Complexity | Description |
| :--- | :--- | :--- |
| **`get(key)`** | $\mathcal{O}(1)$ | Hash Map lookup, deletion, and insertion run in $\mathcal{O}(1)$ average time. |
| **`put(key, value)`** | $\mathcal{O}(1)$ | Hash Map insertion, update, and LRU eviction run in $\mathcal{O}(1)$ average time. |
| **Space Complexity** | $\mathcal{O}(N)$ | Stores at most $N$ key-value pairs where $N$ is the capacity. |

---

## 🚀 How to Run

### Prerequisite
- [Node.js](https://nodejs.org/) installed on your machine.

### Run Command
In your terminal, navigate to the project root directory and run:

```bash
node index.js
```

---

## 📊 Program Output Example

Running `node index.js` executes the assignment test case:

```javascript
const cache = new Cache(2);

cache.put("A", 10);
cache.put("B", 20);
console.log(cache.get("A")); // -> Output: 10
cache.put("C", 30);          // -> Evicts "B" (LRU item)
console.log(cache.get("B")); // -> Output: -1 (Evicted)
console.log(cache.get("C")); // -> Output: 30
console.log(cache.get("A")); // -> Output: 10
```

### Actual Terminal Output:
```text
=== LRU Cache Terminal Output ===
10
-1
30
10
```
