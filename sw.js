importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// Precache essential files on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open('general-cache').then((cache) => {
        return cache.addAll([
          '/recyclingdictionary/',
          '/recyclingdictionary/index.html',
          '/recyclingdictionary/homepage.css',
          '/recyclingdictionary/homepage.js',
          '/recyclingdictionary/recyclingitems.json',
          '/recyclingdictionary/recyclingicon.png',
          '/recyclingdictionary/placeholderimage.jpg',
          '/recyclingdictionary/games.html',
          '/recyclingdictionary/game-icon/whatgoeswhere.png',
          '/recyclingdictionary/game-icon/whatgoeswhere-all.png',
          '/recyclingdictionary/imageslist.json',

        ]);
      }),
      caches.open('result-cache').then((cache) => {
        return cache.addAll([
          '/recyclingdictionary/search.html',
          '/recyclingdictionary/result.html',
          '/recyclingdictionary/whatgoeswhere.html'
        ]);
      }),
      //cache images
      fetch("imageslist.json")
              .then(response => response.json())
              .then(data => {
                  let cacheImages = data.map(file => '/recyclingdictionary/images-lite/' + file);
                  return caches.open('images-cache').then((cache) => {
                        return cache.addAll(cacheImages);
                      })   
              })
              .catch(error => console.log(error)
            ),
    ])        
  );
});
// Function to create a cache key without specific query parameters
const cacheKeyWillBeUsed = ({ request }) => {
    const url = new URL(request.url);
    // Remove the query parameter 'q'
    url.searchParams.delete('q');
    url.searchParams.delete('limit');
    return url.toString();
  };


// Register a route with caching strategy
workbox.routing.registerRoute(
  ({ url }) => url.pathname === '/recyclingdictionary/' || 
  url.pathname === '/recyclingdictionary/index.html' || 
  url.pathname === '/recyclingdictionary/homepage.css' ||
  url.pathname === '/recyclingdictionary/homepage.js' ||
  url.pathname === '/recyclingdictionary/recyclingitems.json' ||
  url.pathname === '/recyclingdictionary/recyclingicon.png' ||
  url.pathname === '/recyclingdictionary/placeholderimage.jpg' ||
  url.pathname === '/recyclingdictionary/games.html' ||
  url.pathname === '/recyclingdictionary/game-icon/whatgoeswhere.png' ||
  url.pathname === '/recyclingdictionary/game-icon/whatgoeswhere-all.png' ||
  url.pathname === '/recyclingdictionary/imageslist.json',
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
  ({ url }) => url.pathname === '/recyclingdictionary/search.html' || 
  url.pathname === '/recyclingdictionary/result.html' || 
  url.pathname === '/recyclingdictionary/whatgoeswhere.html',
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


//image cache
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'images-cache',
      plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
              statuses: [200],
          })
      ],
  })
);