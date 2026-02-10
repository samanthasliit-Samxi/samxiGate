importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// 1. Firebase Configuration (From your 3.jpg)
const firebaseConfig = {
    apiKey: "AIzaSyCuW_CceAUGiUKem_jmzzuEU-Bu2H_lb64",
    authDomain: "samxi-smart-door.firebaseapp.com",
    projectId: "samxi-smart-door",
    storageBucket: "samxi-smart-door.firebasestorage.app",
    messagingSenderId: "197684150323",
    appId: "1:197684150323:web:b84ca34e8fe1f940f8e346",
    measurementId: "G-FTPWXT4GGM"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 2. Handle Background Messages (Screen Off)
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 3. Offline Support (Moved from your old service-worker.js)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('samxi-v5').then((cache) => {
      return cache.addAll(['index.html', 'manifest.json']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

