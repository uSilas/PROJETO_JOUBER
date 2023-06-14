import {firestore} from '../config/config.mjs';
import {collection, addDoc, getDoc, getDocs} from "firebase/firestore";
import express from 'express';
import {query, where} from "firebase/firestore";
export var router_cliente = express.Router();


router_cliente.post('/cliente/cadastro', async (req,res) =>{

    const userRef = collection(firestore, 'usuario');
    const nome_user = req.body.nome_user;
    const existsUser = query(userRef,where("nome_user","==",nome_user));
    const queryUser = await getDocs(existsUser);
    var numero_user = [];
    queryUser.forEach((doc)=>{
        numero_user.push(doc.data);
        console.log(doc.data());
    })

    if(numero_user.length == 0){
        const data = req.body;
        const cliente = await addDoc(collection(firestore, "usuario",),data)
    }
    
    res.send('deu certo o cadastro do cliente');
})