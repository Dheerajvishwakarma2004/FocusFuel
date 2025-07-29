// A unique name for our cache
const cacheName = 'focusfuel-v1';

// A list of all the files we want to cache
const filesToCache = [
  '/',
  '/index.html',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
];

// The install event, which is fired when the service worker is installed
self.addEventListener('install', event => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});

// The fetch event, which is fired for every network request
self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    // Try to find the response in the cache
    caches.match(event.request)
      .then(response => {
        // If the response is in the cache, return it. Otherwise, fetch it from the network.
        return response || fetch(event.request);
      })
  );
});
