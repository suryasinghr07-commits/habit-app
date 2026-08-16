importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

self.addEventListener('notificationclick', function(event) {
  event.stopImmediatePropagation();
  event.notification.close();
  
  // 🚀 DYNAMIC TARGET URL: Yeh khud-b-hud aapke current domain ya sub-folder (jaise /habit-app/) ko utha lega!
  const targetUrl = self.registration.scope;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url.startsWith(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

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
