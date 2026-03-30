///在這裡完成PWA的控制

///v0
self.addEventListener('install', event => {
  console.log('Service Worker 安裝完成');
  self.skipWaiting(); // 立即進入 activate
});

self.addEventListener('activate', event => {
  console.log('Service Worker 啟動');
  event.waitUntil(clients.claim()); // 接管所有頁面
});

self.addEventListener('fetch', event => {
  // 最小可用 SW
}); 


self.addEventListener('push', event => {

    let data = {};

    try {
        data = event.data.json();
    } catch(e) {
        data = { title: "通知", body: "你有新消息", url: "/" };
        console.warn("catch", e);
    }

    if (true) {
        ///const utcTag = new Date().toISOString(); // e.g., 2026-03-07T12:34:56.789Z
        const utcTag = Date.now().toString(); // e.g., "1710153296789"
        /*
        event.waitUntil(
            self.registration.showNotification(data.title, {
                body: data.body,
                icon: "/icon-512.png",
                badge: "/icon-96.png",        ///Android
                ///vibrate: [200, 100, 200],  ///Android
                tag: utcTag,                  // 追加同tag會合併通知
                renotify: true,               ///Android  // 更新時震動
                ///requireInteraction: false, ///Android  // 是否一直顯示
                data: { 
                    url: data.url,    ///"https://copyright.nins.cc/"  ///data.url
                    ///id: Date.now() + "-" + crypto.randomUUID(),
                    id: Date.now() + "-" + Math.random().toString(36).substring(2),
                }
            }).catch(err => console.warn("catch:showNotification", err))
        );  */

        event.waitUntil((async () => {
            // 顯示通知
            await self.registration.showNotification(data.title, {
                body: data.body,
                icon: "/icon-512.png",
                badge: "/icon-96.png",
                tag: utcTag,
                renotify: true,
                data: { url: data.url, id: Date.now() + "-" + Math.random().toString(36).substring(2) }
            });
    
            // 載入 IndexedDB JS
            importScripts('https://copyright.nins.cc/children/0001/nins-indexdb.js');
    
            // 打開資料庫並儲存資料
            let indexdb = await openDatabase("nins", "users");
            await updateData(indexdb, "users", {
                id: Date.now(),
                parentId: ``,
                email: ``,
                to: ``,
                time: `${utc}${offset}`,
                data: `${data.body}`
            });
        })());
    }
});  ///20260307

self.addEventListener("notificationclick", function (event) {
    ///event.notification.close();  // 關閉通知
    let url = "";
    try {
        url = event.notification.data?.url || "/";
    } catch(e) {
        url = "/";
        console.warn("catch", e);
    }

    if (true) {
        event.waitUntil(
            clients.openWindow(url).catch(err => console.warn("catch:openWindow", err))
        );
    }
});  /**/

const display = "minimal-ui, browser, standalone, fullscreen"; 

///const CACHE_NAME = 'v1.0.20260315.1333';
///import { precacheAndRoute } from 'workbox-precaching';
///precacheAndRoute(self.__WB_MANIFEST);

/*  
///V1
self.addEventListener('install', event => {
  console.log('Service Worker 安裝完成');
  self.skipWaiting(); // 立即進入 activate
});

self.addEventListener('activate', event => {
  console.log('Service Worker 啟動');
  event.waitUntil(clients.claim()); // 接管所有頁面
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request) // 直接走網路
      .catch(() => caches.match(event.request)) // 網路失敗時才用快取
  );
});

self.addEventListener('push', event => {
    const data = event.data.json();
    ///const utcTag = new Date().toISOString(); // e.g., 2026-03-07T12:34:56.789Z
    const utcTag = Date.now().toString(); // e.g., "1710153296789"
  
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/icon-512.png",
            badge: "/icon-96.png",        ///Android
            ///vibrate: [200, 100, 200],  ///Android
            tag: utcTag,                  // 追加同tag會合併通知
            renotify: true,               ///Android  // 更新時震動
            ///requireInteraction: false, ///Android  // 是否一直顯示
            data: { 
                url: data.url,    ///"https://copyright.nins.cc/"  ///data.url
                id: Date.now() + "-" + crypto.randomUUID(),
            }
        })
    );
});  ///20260307

self.addEventListener("notificationclick", function (event) {
    ///event.notification.close();  // 關閉通知

    const url = event.notification.data?.url || "/";

    event.waitUntil(
        clients.openWindow(url)
    );
});  */

