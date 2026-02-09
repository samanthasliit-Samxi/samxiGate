self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('samxi-v1').then((cache) => {
      return cache.addAll(['index.html', 'manifest.json']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});