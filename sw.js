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
                    ///id: Date.now() + "-" + crypto.randomUUID(),
                    id: Date.now() + "-" + Math.random().toString(36).substring(2),
                }
            })
        );
    } catch(e) {
        console.warn("catch", e);
    }
});  ///20260307

self.addEventListener("notificationclick", function (event) {
    ///event.notification.close();  // 關閉通知
    let url = "";
    try {
        url = event.notification.data?.url || "/";
    
        event.waitUntil(
            clients.openWindow(url)
        );
    } catch(e) {
        console.warn("catch", e);
    }
}); 

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

