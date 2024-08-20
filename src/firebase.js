import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNP1j1FHktMFNyGYSA08FS7M764R6IzK4",
  authDomain: "netflix-clone-45305.firebaseapp.com",
  projectId: "netflix-clone-45305",
  storageBucket: "netflix-clone-45305.appspot.com",
  messagingSenderId: "1063365153914",
  appId: "1:1063365153914:web:e40f6880ced1deb56697c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore(app);

const signUp = async (name,email,password)=> {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(database, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })

    } catch (error) {
        console.log (error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=> {
    try{
        signInWithEmailAndPassword(auth, email, password)

    }   catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, database, login, signUp, logout}