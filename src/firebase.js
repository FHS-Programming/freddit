import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyAKX8wCX_9o-mY9EUmCftodJpqQsYljWEE",
  authDomain: "fhs-freddit.firebaseapp.com",
  projectId: "fhs-freddit",
  storageBucket: "fhs-freddit.appspot.com",
  messagingSenderId: "428662244362",
  appId: "1:428662244362:web:95e049f41d2cb6c7288bf3",
  measurementId: "G-2R19GMN5EB"
};


  require("firebase/firestore");

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export  {storage, auth};
export default db;