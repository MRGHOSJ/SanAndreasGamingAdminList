import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBAV1an9KRDLuaW1sG5Xune1MMZpD52QdQ",
    authDomain: "sagadminpanel.firebaseapp.com",
    databaseURL: "https://sagadminpanel.firebaseio.com",
    projectId: "sagadminpanel",
    storageBucket: "",
    messagingSenderId: "807729199407",
    appId: "1:807729199407:web:9cf5124e63300058"
  };

const fire = firebase.initializeApp(firebaseConfig);

const firestore = fire.firestore()

 firestore.settings({timestampsInSnapshots: true})
 

 export { fire,firestore };