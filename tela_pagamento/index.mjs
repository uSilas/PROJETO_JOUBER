
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

// Seletor para os campos de entrada
const inputFields = document.querySelectorAll('.input-transform');

// Adicionando um evento de escuta para cada campo de entrada
inputFields.forEach(input => {
  input.addEventListener('input', function() {
    this.value = this.value.toUpperCase();
  });
});

var product = fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.data.link_img);
      console.log(data.data.preco);
      const preco = data.data.preco;
      document.getElementById('precor').value = data.data.preco;

    })
    .catch(error => {
      
      console.error('Ocorreu um erro:', error);
    });
  
    
document.querySelector('#botao').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('deu crt fml');
    const form = document.querySelector('#formulario');
    console.log(form)
    const formData = new FormData(form);
    var codigo = "16";
    formData.append("cod_user",codigo);
    const preco = document.querySelector('#precor').value;
    console.log(preco)
    
    const uf = document.querySelector('#uf').value;
    console.log(uf);
    formData.append("uf", uf);
    formData.append("preco", preco)
    console.log(formData);
      
      fetch('https://8375-200-36-133-233.ngrok-free.app/StarPet/backend/pedido_produto/add',{
      body:formData,
      method: "POST",
      mode: "cors"
      })
    .then(response => response.json())
    .then(data => {console.log(data)
        console.log('deu certo')
        console.log(formData)
        function renderizar(data){
          const img = document.createElement('img');
          const div = document.createElement('div');
          const h1 = document.createElement('h1')
          const text = document.createTextNode("Leia o código QR a seguir para efetuar a compra:");
          h1.appendChild(text);
          h1.classList.add('textinho');
          div.appendChild(h1);
          img.setAttribute('src', 'data:image/jpeg;base64,'+ data.qr_code.qr_code_base64);
          img.classList.add('qr-code');
          div.appendChild(img);
          div.classList.add('qr-fundo');
          
          
          document.body.appendChild(div);
          
        }
        renderizar(data);
      })
    .catch(error => {
      
      console.error('Ocorreu um erro:', error);
      });
      
});
