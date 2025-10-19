// FIX: Bump cache version to ensure the service worker updates with new URLs.
const CACHE_NAME = 'sub7a-cache-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.tsx',
  '/icon.svg',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;700&family=Dosis:wght@700&display=swap',
  // FIX: Update @google/genai to a newer version compatible with the latest API guidelines.
  'https://esm.sh/@google/genai@0.12.0'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      // Force the waiting service worker to become the active service worker.
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from cache
        if (response) {
          return response;
        }

        // Not in cache - fetch from network
        return fetch(event.request).then(
            (response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    // For external resources like Google Fonts or esm.sh, we might get opaque responses.
                    // We will cache them anyway, but we can't inspect them.
                    // A 'basic' response type means it's from the same origin.
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            }
        );

      })
  );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        // Take control of all open clients (tabs) immediately.
        }).then(() => self.clients.claim())
    );
});
