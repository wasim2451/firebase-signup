import { createContext, useContext } from "react";
import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword ,GoogleAuthProvider , signInWithPopup ,signInWithEmailAndPassword ,signOut} from "firebase/auth";
import { getDatabase , ref, set} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAIwMBVcG7XDQJ1TwCHihDuLyKG2i1IbdA",
    authDomain: "basic-234.firebaseapp.com",
    projectId: "basic-234",
    storageBucket: "basic-234.firebasestorage.app",
    messagingSenderId: "236269585931",
    appId: "1:236269585931:web:b7ec846ae1fd4f0cee690e",
    databaseURL: "https://basic-234-default-rtdb.firebaseio.com",
};
export const app=initializeApp(firebaseConfig);
export const db=getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const FirebaseContext=createContext(null);
export const Provider=(props)=>{

    const signup=(email,pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass);
    };
    const signin=(email,pass)=>{
        return signInWithEmailAndPassword(auth,email,pass);
    }
    const pushtoDB=(key,data)=>{
        return set(ref(db,key),data);
    }
    const signGoogle=()=>{
        return signInWithPopup(auth,provider);
    }
    return (
        <FirebaseContext.Provider value={{signup,signin,signOut,pushtoDB,signGoogle,GoogleAuthProvider,auth,onAuthStateChanged}}>
        {props.children}
        </FirebaseContext.Provider>
    )
};
export const useFirebase=()=>{
    const data=useContext(FirebaseContext);
    return data;
}