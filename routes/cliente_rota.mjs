import {firestore} from '../config/config.mjs';
import {collection, addDoc} from "firebase/firestore";
import express from 'express';
export var router_cliente = express.Router();

router_cliente.post('/cliente/cadastro', async (req,res) =>{
    
    console.log(req.body);
    const data = req.body;
    const cliente = await addDoc(collection(firestore, "usuario",),data)
    res.send('deu certo o cadastro do cliente');
})