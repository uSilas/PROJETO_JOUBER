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
// Obtém o valor do parâmetro "id" da URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Use o ID do produto para exibir os detalhes do produto na página
console.log("ID do produto:", productId);

const url = `http://localhost:3000/product_select?id=${productId}`;

var product = fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
  })
  .catch(error => {
    
    console.error('Ocorreu um erro:', error);
  });


