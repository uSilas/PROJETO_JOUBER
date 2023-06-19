import {firestore} from '../config/config.mjs';
import {collection} from "firebase/firestore";
import {query, where, getDocs} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import express from 'express';
var delete_router = express.Router();

delete_router.post('/delete', async (req,res) =>{
    const tipo_opcao = req.body.tipo;
    
    if(tipo_opcao == "produto"){
    
    const nome_produto = req.body.nome_x;
    const productCollec = collection(firestore, 'produto');
    const productQuery = query(productCollec, where("nome_produto",'==',nome_produto));
    const querySnapshot = await getDocs(productQuery);
    var numero_produto = [];
    querySnapshot.forEach(async (docSnapshot) => {
        numero_produto.push(doc.data);
    });
    if(numero_produto.length > 0){
    querySnapshot.forEach(async (docSnapshot) => {
        const productID = docSnapshot.id;
        const productRef = doc(firestore, "produto", productID);

        await deleteDoc(productRef);

    });
    res.send("deu certo o delete do produto");
    console.log(tipo_opcao);
    console.log(req.body);
}else{
    res.send("produto não existe");
}
    
}else if(tipo_opcao == "user"){
    const nome_user = req.body.nome_x;
    const userCollec = collection(firestore, 'usuario');
    const userQuery = query(userCollec, where("nome_user",'==',nome_user));
    const querySnapshot = await getDocs(userQuery);
    var numero_user = []
    querySnapshot.forEach(async (docSnapshot) =>{
        numero_user.push(doc.data);
    })
    if(numero_user.length > 0){
    querySnapshot.forEach(async (docSnapshot) => {
        const userID = docSnapshot.id;
        const userRef = doc(firestore, "usuario", userID);

        await deleteDoc(userRef);

    });
    res.send("deu certo o delete do usuário");
    console.log(tipo_opcao);
    console.log(req.body);
}else{
    res.send("usuario não existe");
}
}
})

export default delete_router;