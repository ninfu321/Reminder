import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import 'firebase/messaging';
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkF5ucxPE6UfVXazcYuXmw5HsAG0-PdH4",
    authDomain: "calculator-efd54.firebaseapp.com",
    databaseURL: "https://calculator-efd54-default-rtdb.firebaseio.com",
    projectId: "calculator-efd54",
    storageBucket: "calculator-efd54.appspot.com",
    messagingSenderId: "943590749124",
    appId: "1:943590749124:web:26664cac4c35fbb769aa91",
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
    getToken(messaging, {vapidKey:'BJMctEnpwZw6YGFdfQxCV0OCTYjRB9bid6H5TQ1fnE7s-aGjIUrhoJDxfutkZOxInGtSFGT6I8kstWFDh8kLnbg'})
    .then((currentToken)=>{
    if(currentToken){
        console.log('currentToken: ', currentToken);
    } else{
        console.log('Can not get token');
    }
})

    
    } else {
        console.log('Do not have permission!')
    }
      });
    }
    requestPermission();
    
export const auth = getAuth(app);
export const db = getDatabase(app);
