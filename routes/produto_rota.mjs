import {firestore} from '../config/config.mjs';
import {collection, addDoc} from "firebase/firestore";
import {query, where, getDocs} from "firebase/firestore";
import express from 'express';
var router_produtos = express.Router();

router_produtos.post('/produto/cadastro', async (req,res) =>{
    console.log(req.body);
    const productRef = collection(firestore, 'produto');
    const nome_produto = req.body.nome_produto;
    const existsProduct = query(productRef,where("nome_produto","==",nome_produto));
    const queryProduct = await getDocs(existsProduct);
    var numero_product = []
    queryProduct.forEach((doc)=>{
        numero_product.push(doc.data);
        console.log(doc.data());
    })

    if(numero_product.length == 0){
        const data = req.body;
    const produto = await addDoc(collection(firestore, "produto"),data)
    res.send('deu certo o cadastro do produto');
    }else{
        res.send('<script>alert("Esse produto ja existe")</script>')
    }
    
})
export default router_produtos;