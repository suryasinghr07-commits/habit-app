// 🚀 STEP 1: SABSE PEHLE APNA RULE LAGAO (Firebase ke load hone se pehle!)
self.addEventListener('notificationclick', function(event) {
  event.stopImmediatePropagation(); // Firebase ke 404 error wale default action ko rok do
  event.notification.close();       // Click hote hi notification screen se hata do
  
  // 🚀 DYNAMIC URL: Yeh khud samajh jayega ki app kahan hai (GitHub ya Localhost)
  const targetUrl = self.registration.scope; 
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Agar app pehle se background me khula hai, to use saamne (focus) lao
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url.startsWith(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      // Agar app poori tarah band hai, to PWA ko naye sire se kholo
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// 🚀 STEP 2: AB FIREBASE KO IMPORT KARO (Taaki wo humare rule ke baad aaye)
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
