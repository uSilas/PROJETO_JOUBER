const firebaseConfig = {
    apiKey: "AIzaSyDwU9Mj5eKJaYn-_NjAlIPxpVKkSNvQRSo",
    authDomain: "back-end-project-53287.firebaseapp.com",
    projectId: "back-end-project-53287",
    storageBucket: "back-end-project-53287.appspot.com",
    messagingSenderId: "128562885403",
    appId: "1:128562885403:web:204f702158d7974af299be",
    measurementId: "G-H1YM6DWJCM"
  };

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export function AuthFirebase(){
    let user;
    const signInWithPopUp = ()=>{
       return new Promise((resolve, reject)=>{
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
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
             firebase.auth().signOut().then(() => {
                resolve("saiu")
             }).catch((error) => {
                reject(error)
             });
           })
     }

     


    return {signInWithPopUp, SignOutGoogle}
}

const btn = document.getElementById("btn")
const btn1 = document.getElementById("btn1")
const img = document.getElementById("img")
const p = document.getElementById("p")

btn.addEventListener("click", ()=>{
    const {signInWithPopUp, user} = AuthFirebase();

    signInWithPopUp().then(data => {
        console.log("deu bom")
    })

    
})


btn1.addEventListener("click", ()=>{
    const {SignOutGoogle} = AuthFirebase();

    SignOutGoogle().then(() => {
        console.log("voce saiu")
    })

    
})

firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        // User is signed in
        img.src = user.photoURL
        p.innerHTML = user.email

        console.log(user);
      } else {
        // User is signed out
        console.log('User is signed out');
      }
})




   