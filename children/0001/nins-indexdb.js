
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

openDatabase(DatabaseName, ObjectStore).then(db => {
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