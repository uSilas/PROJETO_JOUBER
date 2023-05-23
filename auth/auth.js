import {signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

export function AuthFirebase(){
    let user;
    const signInWithPopUp = ()=>{
       return new Promise((resolve, reject)=>{
            signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                resolve(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                reject(error)
            });
       })
    }

    const SignOutGoogle = ()=>{
        return  new Promise((resolve, reject) => {
            signOut(auth).then(() => {
               resolve("saiu")
            }).catch((error) => {
               reject(error)
            });
          })
    }

    onAuthStateChanged(auth, (currentUser)=>{
        user = currentUser
    })


    return {signInWithPopUp, SignOutGoogle, user: user}
}