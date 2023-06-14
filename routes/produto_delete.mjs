import {firestore} from '../config/config.mjs';
import {collection} from "firebase/firestore";
import {query, where, getDocs} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import express from 'express';
var delete_produtos = express.Router();

delete_produtos.post('/produto/delete', async (req,res) =>{
    const nome_produto = req.body.nome_produto;
    const productCollec = collection(firestore, 'produto');
    const productQuery = query(productCollec, where("nome_produto",'==',nome_produto));
    const querySnapshot = await getDocs(productQuery);
    querySnapshot.forEach(async (docSnapshot) => {
        const productID = docSnapshot.id;
        const productRef = doc(firestore, "produto", productID);

        await deleteDoc(doc(firestore,"produto",productRef));
    });
    res.send("deu certo o delete do produto");
})
export default delete_produtos;