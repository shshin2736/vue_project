const version = `1.0.2`;

// eslint-disable-next-line no-undef
if (workbox) {
  console.log(`${version} Yay! Workbox is loaded 🎉`);
  // self.skipWaiting();

  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  // eslint-disable-next-line no-undef
  workbox.routing.registerRoute(
    /\.js$/,
    // eslint-disable-next-line no-undef
    new workbox.strategies.NetworkFirst(),
  );

  // eslint-disable-next-line no-undef
  workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    // eslint-disable-next-line no-undef
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: `css-cache`,
    }),
  );

  // eslint-disable-next-line no-undef
  workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    // eslint-disable-next-line no-undef
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: `image-cache`,
      plugins: [
        // eslint-disable-next-line no-undef
        new workbox.expiration.Plugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );

  // eslint-disable-next-line no-undef
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
  addEventListener('message', event => {
    const replyPort = event.ports[0];
    const message = event.data;
    if (replyPort && message && message.type === 'skip-waiting') {
      event.waitUntil(
        self.skipWaiting().then(
          () => replyPort.postMessage({ error: null }),
          error => replyPort.postMessage({ error }),
        ),
      );
    }
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
