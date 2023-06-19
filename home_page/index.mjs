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

const listContainer =  document.querySelector('#list')
var products = []

function render(products){
    let list = '';
    if(products.length < 1){
        list += `<div id="no-products" style="color:white;">nenhum produto dísponivel</div>`
    }else{
        products.forEach((product, index) =>{
            list+=`<div class="product"><div class="product-image">
            <img src="${product.data.link_img}" alt="">
        </div>
        <h1>${product.data.nome_produto} </br>${product.data.preco} R$ </h1>
        <div id="codigo_produto" style="display:none;">${product.id}</div>
        <button id="compre">COMPRE AGORA</button>
        </div>
            
            `
            
        })
    }


    listContainer.innerHTML = list;
}

products = fetch('http://localhost:3000/list')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    render(data);
    
  })
  .catch(error => {
    
    console.error('Ocorreu um erro:', error);
  });
  

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
document.querySelector('#list').addEventListener('click', function(event) {
    if (event.target.classList.contains('product')) {
        // Obtém o elemento .product clicado
        const productElement = event.target;

        const divFilho = productElement.querySelector('#codigo_produto');
        // Redireciona o usuário para outra página com base no ID do produto
        const valorDivFilho = divFilho.textContent;
        window.location.href = `../tela_produto/index.html?id=${valorDivFilho}`;

    }
});

