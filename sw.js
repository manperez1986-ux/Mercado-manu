const CACHE_NAME = 'mercado-manu-v139';
const urlsToCache = ['/', '/index.html', 'https://cdn.tailwindcss.com'];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(c){ return c.addAll(urlsToCache); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(r){
    return r || fetch(e.request).catch(function(){ return caches.match('/index.html'); });
  }));
});
