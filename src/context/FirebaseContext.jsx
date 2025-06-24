import { createContext, useContext } from "react";
import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);
const FirebaseContext=createContext(null);
export const Provider=(props)=>{

    const signup=(email,pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass);
    };
    return (
        <FirebaseContext.Provider value={{signup}}>
        {props.children}
        </FirebaseContext.Provider>
    )
};
export const useFirebase=()=>{
    const data=useContext(FirebaseContext);
    return data;
}