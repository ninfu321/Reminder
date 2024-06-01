importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBkF5ucxPE6UfVXazcYuXmw5HsAG0-PdH4",
    authDomain: "calculator-efd54.firebaseapp.com",
    databaseURL: "https://calculator-efd54-default-rtdb.firebaseio.com",
    projectId: "calculator-efd54",
    storageBucket: "calculator-efd54.appspot.com",
    messagingSenderId: "943590749124",
    appId: "1:943590749124:web:26664cac4c35fbb769aa91"
  });
  
  const messaging = firebase.messaging();
  
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }
