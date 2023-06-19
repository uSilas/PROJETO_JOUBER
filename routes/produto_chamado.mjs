import {firestore} from '../config/config.mjs';
import {collection} from "firebase/firestore";
import {query, where, getDocs, getDoc} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import express from 'express';
var productSelect = express.Router();

productSelect.get('/product_select', async (req,res) =>{
    const doc_id = req.body;
    const docRef = doc(firestore, "produto", doc_id);
    const docSnap = await getDocs(docRef);
    res.json(docSnap.data());
});

export default productSelect;