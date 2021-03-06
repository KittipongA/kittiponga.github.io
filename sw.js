if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        var CACHE_NAME = 'my-site-cache-v1';
        var urlsToCache = [
            '/',
            '/index.html',
            '/script.js'
        ];

        self.addEventListener('install', function(event) {
            // Perform install steps
            event.waitUntil(
                caches.open(CACHE_NAME).then(function(cache) {
                    console.log('Opened cache');
                    return cache.addAll(urlsToCache);
                })
            );
        });

        self.addEventListener('fetch', function(event) {
            event.respondWith(
                caches.match(event.request).then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    
                    return fetch(event.request);
                })
            );
        });
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}
