const CACHE_NAME = "twinmodus-cache-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Install
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Aktivieren & alte Caches löschen
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});