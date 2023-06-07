import {firestore} from '../config/config.mjs';
import {collection, addDoc} from "firebase/firestore";
import express from 'express';
export var router_produto = express.Router();

router_produto.post('/produto/cadastro', async (req,res) =>{
    console.log(req.body);
    const data = req.body;
    const cliente = await addDoc(collection(firestore, "produto"),data)
    res.send('deu certo o cadastro do produto');
})