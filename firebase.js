import { initializeApp } from "firebase/app";
import { GoogleAuthProvider , getAuth} from 'firebase/auth'
 
const firebaseConfig = {
  apiKey: "AIzaSyAp8qshK3ESAj4oH89OEoCOFky0xt_gmfY",
  authDomain: "uber2-384f1.firebaseapp.com",
  projectId: "uber2-384f1",
  storageBucket: "uber2-384f1.appspot.com",
  messagingSenderId: "805075410926",
  appId: "1:805075410926:web:8e30d8a6a80061689038ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth }