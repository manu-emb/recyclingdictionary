importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// Precache essential files on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('general-cache').then((cache) => {
      return cache.addAll([
        '/recyclingdictionary/',
        '/recyclingdictionary/index.html',
        '/recyclingdictionary/homepage.css',
        '/recyclingdictionary/homepage.js',
        '/recyclingdictionary/recyclingitems.json'
      ]);
    }),
    caches.open('result-cache').then((cache) => {
      return cache.addAll([
        '/recyclingdictionary/search.html',
        '/recyclingdictionary/result.html'
      ]);
    })      
  );
});
/* image caching being reworked
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);*/
// Function to create a cache key without specific query parameters
const cacheKeyWillBeUsed = ({ request }) => {
    const url = new URL(request.url);
    // Remove the query parameter 'q'
    url.searchParams.delete('q');
    return url.toString();
  };


// Register a route with caching strategy
workbox.routing.registerRoute(
  ({ url }) => url.pathname === '/recyclingdictionary/' || 
  url.pathname === '/recyclingdictionary/index.html' || 
  url.pathname === '/recyclingdictionary/homepage.css' ||
  url.pathname === '/recyclingdictionary/homepage.js' ||
  url.pathname === '/recyclingdictionary/recyclingitems.json',
  new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'general-cache',
      plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
              statuses: [200],
          })
      ],
  })
);
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