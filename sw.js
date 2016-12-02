if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        var CACHE_NAME = 'my-site-cache-v1';
        var urlsToCache = [
            '/index.html'
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
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}
