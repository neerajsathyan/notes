// Polyfill for Chrome caching
importScripts('js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open('v1').then(function(cache) {

      // Define what we want to cache
      return cache.addAll([
        '/notes/',
        '/notes/index.html',
        '/notes/js/app.js',
        '/notes/js/jquery.min.js',
        '/notes/css/style.css',
        '/notes/favicon.ico',
        '/notes/manifest.json',
        '/notes/img/icon-60.png',
        '/notes/img/icon-114.png',
        '/notes/img/icon-152.png'
      ]);
    })
  );
});

// Use ServiceWorker (or not) to fetch data
self.addEventListener('fetch', function(event) {

  event.respondWith(

    // Look for something in the cache that matches the request
    caches.match(event.request).then(function(response) {

      // If we find something, return it
      // Otherwise, use the network instead
      return response || fetch(event.request);
    })
  );
});
