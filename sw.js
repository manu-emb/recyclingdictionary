importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// Precache essential files
workbox.precaching.precacheAndRoute([
    { url: '/recyclingdictionary', revision: '1' },
    { url: '/recyclingdictionary/index.html', revision: '1' },
    { url: '/recyclingdictionary/homepage.css', revision: '1' },
    { url: '/recyclingdictionary/homepage.js', revision: '1' },
    { url: '/recyclingdictionary/search.html', revision: '1' },
    { url: '/recyclingdictionary/result.html', revision: '1'},
    { url: '/recyclingdictionary/recyclingitems.json', revision: '1' },
]);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);
// Function to create a cache key without specific query parameters
const cacheKeyWillBeUsed = ({ request }) => {
    const url = new URL(request.url);
    // Remove the query parameter 'q'
    url.searchParams.delete('q');
    return url.toString();
  };

// Install event to precache search.html & result.html in "my-cache"
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('result-cache').then((cache) => {
        return cache.addAll([
          '/recyclingdictionary/search.html',
          '/recyclingdictionary/result.html'
        ]);
      })
    );
  });

// Register a route with caching strategy
workbox.routing.registerRoute(
    ({ url }) => url.pathname === '/recyclingdictionary/search.html' || url.pathname === '/recyclingdictionary/result.html',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'result-cache',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
            {
                cacheKeyWillBeUsed,
            },
        ],
    })
);