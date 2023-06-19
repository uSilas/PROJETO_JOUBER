import {firestore} from '../config/config.mjs';
import {collection} from "firebase/firestore";
import {query, where, getDocs} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import express from 'express';
var lista_router = express.Router();

lista_router.get('/list', async (req,res) =>{
    const querySnapshot = await getDocs(collection(firestore, "produto"));
    var numero_product = []
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  numero_product.push({id: doc.id, data: doc.data()});
  console.log(doc.id, " => ", doc.data());
  
});
res.json(numero_product);

})

export default lista_router;