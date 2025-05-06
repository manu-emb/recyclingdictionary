importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// Precache essential files
workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/homepage.css', revision: '1' },
    { url: '/homepage.js', revision: '1' },
    { url: '/search.html', revision: '1' },
    { url: '/result.html', revision: '1'},
    { url: 'recyclingitems.json', revision: '1' },
]);
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);
workbox.routing.registerRoute(
    ({url}) => url.pathname === '/result.html',
    new workbox.strategies.NetworkFirst({
        cacheName: 'result-cache',
        plugins: [
            {
                cacheWillUpdate: async ({request, response}) => {
                    return response;
                },
            },
        ],
        ignoreSearch: true
    })
);