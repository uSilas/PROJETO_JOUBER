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
    console.log(data.data.link_img);
    imagem(data);
    titulo(data);
    capa(data);
  })
  .catch(error => {
    
    console.error('Ocorreu um erro:', error);
  });
  
function imagem(product){
    const divElement = document.querySelector('.conteiner');
    divElement.style.backgroundImage = `url(${product.data.link_img})`;

}
function titulo(product){
    const text = document.querySelector('#title');
    text.innerHTML = `${product.data.nome_produto}`+`</br>`+`${product.data.preco}`;
}
function capa(product){
    const capa = document.querySelector('.capa');
    capa.style.backgroundImage = `url(${product.data.link_img})`;
    const desc = document.querySelector('#desc');
    desc.innerHTML = `${product.data.descricao}`;
    const requisitos = document.querySelector('#req');
    requisitos.innerHTML = `REQUISITOS MÍNIMOS: `+`</br>`+` `+`</br>`+`${product.data.requisitos}`
    const empresa = document.querySelector('#empresa');
    empresa.innerHTML = `EMPRESA: `+`</br>`+` `+`</br>`+`${product.data.nome_empresa}`
}

document.querySelector('.input').addEventListener('click', function(product) {

      window.location.href = `../tela_pagamento/index.html?id=${productId}`;

  
});
