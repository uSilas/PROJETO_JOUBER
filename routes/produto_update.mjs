import {firestore} from '../config/config.mjs';
import {collection, addDoc, getDoc} from "firebase/firestore";
import {query, where} from "firebase/firestore";
import express from 'express';
export var router_produto = express.Router();
const produtosRef = collection(firestore,"produtos");

router_produto.post('/produto/update', async (req,res) =>{
    const nome_atual = req.body.nome_jogo;
    const produto_escolhido = query(produtosRef, where("nome_produto","==",nome_atual));
    const querySnapshot = await getDoc(produto_escolhido);

    querySnapshot.forEach((doc)=>{
        console.log(doc.data());
    })
    
    
})