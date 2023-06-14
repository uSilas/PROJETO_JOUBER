
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

const storage = firebase.storage();
const storageRef = storage.ref("produtos");
const file = document.getElementById("file");


//funçao que faz o upload e retorna o link
async function setFile(file){

  return new Promise((resolve, reject) =>{
    const uploadTask = storageRef.child(file.name).put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

          resolve(downloadURL)
        });
      }
    );
  })
}



//change e chamada em cada troca de imagem
file.addEventListener("change", async (e)=>{

  //pegando o valor do input file
  let fileUpload = e.target.files[0];


  //pegando url 
  const url = await setFile(fileUpload);

  //agora e so mandar esse url pro banco de dados
  console.log(url);
  const ipt = document.getElementById('link_img');
  ipt.value = url;
})