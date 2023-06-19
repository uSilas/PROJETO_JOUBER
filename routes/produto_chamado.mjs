import {firestore} from '../config/config.mjs';
import {collection} from "firebase/firestore";
import {query, where, getDocs, getDoc} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import express from 'express';
var productSelect = express.Router();

productSelect.get('/product_select', async (req,res) =>{
    const doc_id = req.query.id;
    const newLocal = doc(firestore, "produto", doc_id);
    const docRef = newLocal;
    const docSnap = await getDoc(docRef);
    res.json({id: doc.id, data: doc.data()});
});

export default productSelect;