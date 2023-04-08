import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {


    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
    // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  
    // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  
    // appId: import.meta.env.VITE_FIREBASE_APP_ID,

    apiKey: "AIzaSyDBh5z34X6uyN1B4MUIX9F5xxVUDejyV4I",

    authDomain: "netlynk-28225.firebaseapp.com",
  
    projectId: "netlynk-28225",
  
    storageBucket: "netlynk-28225.appspot.com",
  
    messagingSenderId: "462263583375",
  
    appId: "1:462263583375:web:7a86d10bb9c54c89ba66fa"
  
  
  };


  const app = initializeApp(firebaseConfig)

  export const storage = getStorage(app)
  