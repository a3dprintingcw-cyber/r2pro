/* R2PRO service worker. App shell cached so the courtside wifi stops mattering. */
var CACHE = "r2pro-v3";
var SHELL = [
  "./", "index.html", "app.html", "academies.html", "programs.html",
  "coaches.html", "pricing.html", "404.html", "manifest.webmanifest",
  "assets/styles.css", "assets/data.js", "assets/store.js", "assets/i18n.js",
  "assets/qr.js", "assets/site.js", "assets/figure.js", "assets/app.js",
  "assets/icon.svg", "assets/icon-192.png", "assets/icon-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return Promise.all(SHELL.map(function(u){
      return c.add(u).catch(function(){ /* a missing file must not fail the install */ });
    }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

/* network first for pages so updates land, cache first for assets */
self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  var isPage = req.mode === "navigate" || req.destination === "document";
  if(isPage){
    e.respondWith(fetch(req).then(function(res){
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(req, copy); });
      return res;
    }).catch(function(){
      return caches.match(req).then(function(m){ return m || caches.match("app.html"); });
    }));
    return;
  }
  /* stale while revalidate: serve the cached copy, refresh it in the background */
  e.respondWith(caches.match(req).then(function(m){
    var net = fetch(req).then(function(res){
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(req, copy); });
      return res;
    }).catch(function(){ return m; });
    return m || net;
  }));
});
