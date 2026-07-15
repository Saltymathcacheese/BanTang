const CACHE = 'bantang-v1';
const FILES = [
  'index.html',
  'css/base.css',
  'css/themes/apple-hig.css',
  'css/themes/neo-brutalism.css',
  'css/themes/wabi-sabi.css',
  'css/themes/cyberpunk.css',
  'css/themes/matcha-mint.css',
  'css/themes/taro-purple.css',
  'css/themes/night-brew.css',
  'js/app.js',
  'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request)
    )
  );
});
