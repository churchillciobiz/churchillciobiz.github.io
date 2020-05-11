//self.importScripts('data/orders.js');

var cacheName = 'js13kPWA-v1';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/a2hs2/',
       '/a2hs2/index.html',
       '/a2hs2/index.js',
       '/a2hs2/style.css',
       '/a2hs2/images/fox1.jpg',
       '/a2hs2/images/fox2.jpg',
       '/a2hs2/images/fox3.jpg',
       '/a2hs2/images/fox4.jpg'
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
