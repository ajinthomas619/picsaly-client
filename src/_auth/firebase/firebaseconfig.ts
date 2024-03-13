import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCb-FdaXxe62dN-3FAHcajEsuzRZMy6zTY",
    authDomain: "picsaly-83b89.firebaseapp.com",
    projectId: "picsaly-83b89",
    storageBucket: "picsaly-83b89.appspot.com",
    messagingSenderId: "142511694888",
    appId: "1:142511694888:web:8aae919e194435228a811d",
    measurementId: "G-PY58M8S4NB"
  };


const app = initializeApp(firebaseConfig)
console.log(app)
const provider  = new  GoogleAuthProvider()
provider.setCustomParameters({prompt:"select_account"})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)