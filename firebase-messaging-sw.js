// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Tumhari Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDxwEF9HuPIoJqMGl0h_Ipu5HpNLWEuKFk",
  authDomain: "habit-tracker-app-937f3.firebaseapp.com",
  projectId: "habit-tracker-app-937f3",
  storageBucket: "habit-tracker-app-937f3.firebasestorage.app",
  messagingSenderId: "985225384755",
  appId: "1:985225384755:web:7755a3ffcf2795ba7c6446"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Jab app background mein band hoga, tab notification yahan se aayega
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received: ', payload);
  
  const notificationTitle = payload.notification.title || '🧠 Habit Reminder';
  const notificationOptions = {
    body: payload.notification.body || 'Apna daily check-in karna na bhoolein!',
    icon: '/logo.svg' // Ensure logo.svg is in your folder
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

