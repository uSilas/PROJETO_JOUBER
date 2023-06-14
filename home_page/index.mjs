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
const menu = document.querySelector('.menu');
const btn = document.getElementById("btn")
const btn1 = document.querySelector('#btn1')

btn.addEventListener("click", ()=>{
    const {signInWithPopUp, user} = AuthFirebase();

    signInWithPopUp().then(data => {
        
        fetch("http://localhost:3000/cliente/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome_user: data.displayName})
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            
        
    })
    

    
})
firebase.auth().onAuthStateChanged((user)=>{

    if (user) {
        var adquirido = document.querySelector('#adquiridos');
        adquirido.classList.toggle("visible")
        btn.classList.toggle("visible")
        btn1.classList.toggle("visible")
      } else {
        // User is signed out
        console.log('User is signed out');
      }
})   

btn1.addEventListener("click", ()=>{
    const {SignOutGoogle} = AuthFirebase();

    SignOutGoogle().then(() => {
        console.log("voce saiu")
        var adquirido = document.querySelector('#adquiridos')
        adquirido.classList.toggle("visible")
        btn.classList.toggle("visible")
        btn1.classList.toggle("visible")
    })
    

    
})

