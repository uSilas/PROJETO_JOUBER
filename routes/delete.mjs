import {firestore} from '../config/config.mjs';
import {collection} from "firebase/firestore";
import {query, where, getDocs} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import express from 'express';
var delete_produtos = express.Router();

delete_produtos.post('/delete', async (req,res) =>{
    const nome_user = req.body.nome_user;
    const nome_produto = req.body.nome_produto;
    const tipo_opcao = req.body.tipo;
    if(tipo_opcao == "produto"){
    const productCollec = collection(firestore, 'produto');
    const productQuery = query(productCollec, where("nome_produto",'==',nome_produto));
    const querySnapshot = await getDocs(productQuery);
    querySnapshot.forEach(async (docSnapshot) => {
        const productID = docSnapshot.id;
        const productRef = doc(firestore, "produto", productID);

        await deleteDoc(doc(firestore,"produto",productRef));
    });
    res.send("deu certo o delete do produto");

}else if(tipo_opcao == "user"){
    const userCollec = collection(firestore, 'usuario');
    const userQuery = query(userCollec, where("nome_user",'==',nome_user));
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (docSnapshot) => {
        const userID = docSnapshot.id;
        const userRef = doc(firestore, "usuario", userID);

        await deleteDoc(doc(firestore,"usuario", userRef));
    });
    res.send("deu certo o delete do usuário");
}
})

export default delete_produtos;