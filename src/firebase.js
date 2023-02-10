import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDO2esNrb9fXKAfDKQ1m06cM4tVX2VWmes",
  authDomain: "instagram-clone-42aea.firebaseapp.com",
  projectId: "instagram-clone-42aea",
  storageBucket: "instagram-clone-42aea.appspot.com",
  messagingSenderId: "983844260608",
  appId: "1:983844260608:web:64663d811f42ea22e181e5",
  measurementId: "G-S0CFN9XXR4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
