// Load Ultraviolet in the documented order: bundle, config, service worker.
importScripts("/uv/uv.bundle.js");
importScripts("/uv.config.js");
importScripts("/uv/uv.sw.js");

const ultraviolet = new UVServiceWorker();
self.addEventListener("fetch", (event) => {
  event.respondWith(ultraviolet.fetch(event));
});
