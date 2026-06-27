// service worker 비활성화 + 기존 캐시 전부 삭제 (흰 화면 문제 방지)
// PWA 홈화면 설치는 manifest만으로 동작하므로 SW 없이도 앱은 정상 작동합니다.
self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(c => c.navigate(c.url));
  })());
});
