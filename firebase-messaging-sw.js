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

// Cache for offline support
self.addEventListener('install', (e) => {
    e.waitUntil(caches.open('samxi-v5').then(c => c.addAll(['index.html', 'manifest.json'])));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
