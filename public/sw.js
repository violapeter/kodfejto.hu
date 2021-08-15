/* eslint-disable no-restricted-globals */
const cacheName = 'hu.kodfejto';

self.addEventListener('install', (e) => {
  e.waitUntil(
      caches.open(cacheName).then((cache) => {
        return cache.addAll([
          './',
          './index.html',
          './style.css',
          './script.js',
          './manifest.json',
        ]);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.open(cacheName)
          .then((cache) => cache.match(event.request, {ignoreSearch: true}))
          .then((response) => {
            return response || fetch(event.request);
          }),
  );
});
