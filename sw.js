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
    const data = event.data.json();
    ///const utcTag = new Date().toISOString(); // e.g., 2026-03-07T12:34:56.789Z
    const utcTag = Date.now().toString(); // e.g., "1710153296789"
  
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/icon-512.png",
            ///badge: "/icon-192.png",    ///Android
            ///vibrate: [200, 100, 200],  ///Android
            tag: utcTag,               // 追加同tag會合併通知
            renotify: true,            ///Android  // 更新時震動
            requireInteraction: false, ///Android  // 是否一直顯示
            data: { url: "https://copyright.nins.cc/" }
        })
    );
});  ///20260307
