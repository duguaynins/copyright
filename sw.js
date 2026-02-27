self.addEventListener('install', event => {
  console.log('Service Worker 安裝完成');
});

self.addEventListener('activate', event => {
  console.log('Service Worker 啟動');
});

self.addEventListener('fetch', event => {
  // 最小可用 SW
});
