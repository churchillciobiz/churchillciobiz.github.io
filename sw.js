//self.importScripts('data/orders.js');

var cacheName = 'js13kPWA-v1';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       'https://churchillciobiz.github.io/a2hs2/',
       'https://churchillciobiz.github.io/a2hs2/index.html',
       'https://churchillciobiz.github.io/a2hs2/index.js',
       'https://churchillciobiz.github.io/a2hs2/style.css',
       'https://churchillciobiz.github.io/images/fox1.jpg',
       'https://churchillciobiz.github.io/images/fox2.jpg',
       'https://churchillciobiz.github.io/a2hs2/images/fox3.jpg',
       'https://churchillciobiz.github.io/a2hs2/images/fox4.jpg'
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
