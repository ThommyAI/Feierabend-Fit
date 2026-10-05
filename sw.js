const CACHE='feierabend-fit-501318';
const FILES=["./", "index.html", "fonts.css", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "barlow-condensed-latin-800-normal.woff2", "barlow-condensed-latin-700-italic.woff2", "archivo-latin-700-normal.woff2", "barlow-condensed-latin-800-italic.woff2", "barlow-condensed-latin-700-normal.woff2", "archivo-latin-600-normal.woff2", "barlow-condensed-latin-600-normal.woff2", "archivo-latin-400-normal.woff2", "archivo-latin-500-normal.woff2", "img/pushup-1.webp", "img/pushup-2.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res})))});
