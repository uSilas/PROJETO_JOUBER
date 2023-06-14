import {firestore} from '../config/config.mjs';
import {collection, getDocs, doc} from "firebase/firestore";
import {query, where, updateDoc} from "firebase/firestore";
import express from 'express';
export var router_produto = express.Router();
const produtosRef = collection(firestore,"produto");


router_produto.post('/produto/update', async (req,res) =>{
    const nome_atual = req.body.nome_jogo;
    const data = req.body;
    const produto_escolhido = query(produtosRef, where("nome_produto","==",nome_atual));
    const querySnapshot = await getDocs(produto_escolhido);
    
    querySnapshot.forEach(async (docSnapshot) => {
        const productID = docSnapshot.id;
        const productRef = doc(firestore, "produto", productID);
        await updateDoc(productRef, data);
        console.log(docSnapshot.data());
    });
    res.send('deu certo o update do produto');
    
})