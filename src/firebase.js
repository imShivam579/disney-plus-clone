import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDGlgbAM0cnqklZupZhBEXaoZqEPpVRJBo",
  authDomain: "disney-plus-clone-dc2cb.firebaseapp.com",
  projectId: "disney-plus-clone-dc2cb",
  storageBucket: "disney-plus-clone-dc2cb.appspot.com",
  messagingSenderId: "9905221944",
  appId: "1:9905221944:web:0a8d7d3f2aa614231891cd",
  measurementId: "G-9BR5R719NL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
