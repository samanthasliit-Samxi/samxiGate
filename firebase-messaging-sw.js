importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCuW_CceAUGiUKem_jmzzuEU-Bu2H_lb64",
    projectId: "samxi-smart-door",
    messagingSenderId: "197684150323",
    appId: "1:197684150323:web:b84ca34e8fe1f940f8e346"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: 'icon-192.png'
    });
});

// --- CACHE MANAGEMENT ---
const CACHE_NAME = 'samxi-v6'; // UPDATED TO V6

self.addEventListener('install', (e) => {
    // Force the new service worker to take over immediately
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then(c => {
            console.log('Installing New Cache: ' + CACHE_NAME);
            return c.addAll(['index.html', 'manifest.json']);
        })
    );
});

// DELETE OLD CACHES (Removes v5, v4, etc. to save space)
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('Removing old cache: ' + key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
