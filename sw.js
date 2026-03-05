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
