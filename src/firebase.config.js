import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyB7DFDID-iY1J61YPG3sNmEzhWQ_9g6Hsw",
    authDomain: "graduationproject-b2c00.firebaseapp.com",
    databaseURL: "https://graduationproject-b2c00-default-rtdb.firebaseio.com",
    projectId: "graduationproject-b2c00",
    storageBucket: "graduationproject-b2c00.appspot.com",
    messagingSenderId: "956746569611",
    appId: "1:956746569611:web:f8b62b9f6d391ea903818e",
    measurementId: "G-CYQP8F91G0"
  };
const firebaseApp = initializeApp(firebaseConfig);
const db=getFirestore()
export default db