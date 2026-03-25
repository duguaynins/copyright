async function getAllWithCursor(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName);
    const results = [];

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          // 將當前指向的資料存入陣列
          results.push(cursor.value);
          // 移動到下一筆資料，這會再次觸發 onsuccess
          cursor.continue();
        } else {
          // 游標遍歷結束
          resolve(results);
        }
      };
    };
  });
}
///const allUsers = await getAllWithCursor("MyDatabase", "Users");

///const db = new Dexie("MyDatabase");
///const allData = await db.users.toArray();

async function getAllData(dbName, storeName) {
  return new Promise((resolve, reject) => {
    // 1. 打開資料庫
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // 2. 建立唯讀事務並取得 Object Store
      const transaction = db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      
      // 3. 呼叫 getAll
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result); // 這裡會返回包含所有資料的陣列
      };

      getAllRequest.onerror = () => {
        reject("讀取資料失敗");
      };
    };

    request.onerror = () => reject("無法打開資料庫");
  });
}

// 使用方式：
// getAllData("MyDatabase", "Users").then(data => console.log(data));


/*
(async () => {
    try {
        let db = await openDatabase(DatabaseName, ObjectStoreName);

        // 1. 新增資料
        await addData(db, ObjectStoreName, {
            id: 1,
            name: "Alice",
            age: 25,
            email: "alice@example.com"
        });

        // 2. 用主鍵查詢
        let user = await getData(db, ObjectStoreName, 1);
        console.log("原始資料:", user);

        // 3. 更新資料
        await updateData(db, ObjectStoreName, {
            id: 1,
            name: "Alice",
            age: 26,
            email: "alice@example.com"
        });

        let updated = await getData(db, ObjectStoreName, 1);
        console.log("更新後:", updated);

        // 4. 用索引查詢
        let byEmail = await getDataByIndex(db, ObjectStoreName, ObjectStoreIndex, "alice@example.com");
        console.log("用 email 查到:", byEmail);

        // 5. 刪除資料
        await deleteData(db, ObjectStoreName, 1);

        let deleted = await getData(db, ObjectStoreName, 1);
        console.log("刪除後:", deleted); // undefined

    } catch (err) {
        console.error("錯誤:", err);
    }
})();
*/


const DatabaseName = "nins";
const ObjectStoreName = "users";
const ObjectStoreKey = "id";
const ObjectStoreIndex = "email";

function openDatabase(dbName, storeName, version = 1) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(dbName, version);

        request.onupgradeneeded = event => {
            let db = event.target.result;

            if (!db.objectStoreNames.contains(storeName)) {
                let store = db.createObjectStore(storeName, { keyPath: ObjectStoreKey });
                store.createIndex(ObjectStoreIndex, ObjectStoreIndex, { unique: false });
            }
        };

        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

function addData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        let tx = db.transaction(storeName, "readwrite");
        let store = tx.objectStore(storeName);
        let request = store.add(data);

        request.onsuccess = () => resolve("新增成功");
        request.onerror = e => reject(e.target.error);
    });
}

function updateData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        let tx = db.transaction(storeName, "readwrite");
        let store = tx.objectStore(storeName);
        let request = store.put(data); // 有就更新，沒有就新增

        request.onsuccess = () => resolve("更新成功");
        request.onerror = e => reject(e.target.error);
    });
}

function deleteData(db, storeName, key) {
    return new Promise((resolve, reject) => {
        let tx = db.transaction(storeName, "readwrite");
        let store = tx.objectStore(storeName);
        let request = store.delete(key);

        request.onsuccess = () => resolve("刪除成功");
        request.onerror = e => reject(e.target.error);
    });
}

function getData(db, storeName, key) {  ///主鍵查詢
    return new Promise((resolve, reject) => {
        let tx = db.transaction(storeName, "readonly");
        let store = tx.objectStore(storeName);
        let request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = e => reject(e.target.error);
    });
}

function getDataByIndex(db, storeName, indexName, value) {  ///索引鍵查詢
    return new Promise((resolve, reject) => {
        let tx = db.transaction(storeName, "readonly");
        let store = tx.objectStore(storeName);
        let index = store.index(indexName);
        let request = index.get(value);

        request.onsuccess = () => resolve(request.result);
        request.onerror = e => reject(e.target.error);
    });
}

function getDataByTimeRange(db, storeName, startTime, endTime) {  ///主鍵範圍查詢
    return new Promise((resolve, reject) => {
        let tx = db.transaction(storeName, "readonly");
        let store = tx.objectStore(storeName);

        let range = IDBKeyRange.bound(startTime, endTime);  //***
        let request = store.getAll(range);  //***

        request.onsuccess = () => resolve(request.result);
        request.onerror = e => reject(e.target.error);
    });
}
/*
let rows = await getDataByTimeRange(
    db,
    ObjectStoreName,
    1710000000000,
    1710009999999
);

console.log(rows);
*/
/* 
// 使用範例
const DatabaseName = "nins";
const ObjectStoreName = "users";
const ObjectStoreKey = "id";
const ObjectStoreIndex = "email";

function openDatabase(dbName, storeName, version = 1) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(dbName, version);

        request.onupgradeneeded = event => {
            let db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                let store = db.createObjectStore(storeName, { keyPath: ObjectStoreKey });
                store.createIndex(ObjectStoreIndex, ObjectStoreIndex, { unique: false });
            }
        };

        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

function addData(db, storeName, data) {
    let tx = db.transaction(storeName, "readwrite");
    let store = tx.objectStore(storeName);
    store.add(data);
}

function updateData(db, storeName, data) {
    let tx = db.transaction(storeName, "readwrite");
    let store = tx.objectStore(storeName);
    store.put(data); // put() 會新增或更新
}

function deleteData(db, storeName, key) {
    let tx = db.transaction(storeName, "readwrite");
    let store = tx.objectStore(storeName);
    store.delete(key);
}

function getData(db, storeName, key, callback) {
    let tx = db.transaction(storeName, "readonly");
    let store = tx.objectStore(storeName);
    let request = store.get(key);
    request.onsuccess = () => callback(request.result);
}

function getDataByIndex(db, storeName, indexName, value, callback) {
    // 只讀事務
    let tx = db.transaction(storeName, "readonly");
    let store = tx.objectStore(storeName);

    // 取得索引
    let index = store.index(indexName);

    // 查詢對應值
    let request = index.get(value);

    request.onsuccess = () => callback(request.result);
    request.onerror = e => console.error("索引查詢失敗:", e);
}

openDatabase(DatabaseName, ObjectStoreName).then(db => {
    addData(db, ObjectStoreName, { id: 1, name: "Alice", age: 25 });

    getData(db, ObjectStoreName, 1, result => {
        console.log("原始資料:", result);

        // 更新資料
        updateData(db, ObjectStoreName, { id: 1, name: "Alice", age: 26 });

        getData(db, ObjectStoreName, 1, updated => {
            console.log("更新後:", updated); // {id:1, name:"Alice", age:26}

            // 刪除資料
            deleteData(db, ObjectStoreName, 1);
        });
    });
});
*/

/** 
(async () => {
    let db = await openDatabase(DatabaseName, ObjectStoreName);

    await updateData(db, ObjectStoreName, {
        id: 1710000000007,
        name: "Alice0",
        age: 25,
        email: "alice@example.com"
    });
    await updateData(db, ObjectStoreName, {
        id: 1710000000008,
        name: "Alice1",
        age: 25,
        email: "alice@example.com"
    });
    await updateData(db, ObjectStoreName, {
        id: 1710000000009,
        name: "AliceX",
        age: 25,
        email: "alice@example.com"
    });

    console.log("新增完成");

    let rows = await getDataByTimeRange(
        db,
        ObjectStoreName,
        1710000000000,
        1710009999999
    );

    console.log(rows);
})();
*/
