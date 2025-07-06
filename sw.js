// Service Worker for offline functionality
const CACHE_NAME = "wayne-industries-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/css/styles.css",
  "/assets/js/app.js",
  "/assets/js/auth.js",
  "/assets/js/dashboard.js",
  "/assets/js/security.js",
  "/assets/js/resources.js",
  "https://cdn.tailwindcss.com",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
