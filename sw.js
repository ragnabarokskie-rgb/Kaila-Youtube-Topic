const CACHE = 'yt-topics-v4';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/', 'index.html']))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        let rc = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, rc));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
