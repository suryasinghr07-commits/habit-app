importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDxwEF9HuPIoJqMGl0h_Ipu5HpNLWEuKFk",
  authDomain: "habit-tracker-app-937f3.firebaseapp.com",
  projectId: "habit-tracker-app-937f3",
  storageBucket: "habit-tracker-app-937f3.firebasestorage.app",
  messagingSenderId: "985225384755",
  appId: "1:985225384755:web:7755a3ffcf2795ba7c6446"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 🚀 1. FORCE UPDATE: नया कोड आते ही पुराने फँसे हुए कोड को हटा देगा
self.addEventListener('install', function(event) {
  self.skipWaiting();
});
self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

// 🚀 2. CLICK LOGIC: नोटिफिकेशन पर क्लिक करते ही PWA (ऐप) खुलेगा, ब्राउज़र नहीं!
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // क्लिक करते ही नोटिफिकेशन हटा दो
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // अगर ऐप बैकग्राउंड में पहले से खुला है, तो उसे सामने (Focus) ले आओ
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }
      // अगर ऐप पूरी तरह बंद है, तो उसे इंस्टॉल किए गए PWA मोड में खोलो
      if (clients.openWindow) {
        return clients.openWindow(self.registration.scope);
      }
    })
  );
});
