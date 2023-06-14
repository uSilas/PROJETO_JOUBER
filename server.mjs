import express from 'express';
import {router_cliente} from './routes/cliente_rota.mjs';
import router_produtos from './routes/produto_rota.mjs';
import {router_produto} from './routes/produto_update.mjs';
import cors from 'cors';
import { initializeApp } from "firebase/app";
import delete_router from './routes/delete.mjs';


const port = 3000;
const global = express();

global.use(cors())
global.use(express.json())
global.use(express.urlencoded({extended: true}))

global.use('/', router_cliente);
global.use('/',router_produtos);
global.use('/',router_produto);
global.use('/', delete_router);
global.listen(3000,()=>{
  console.log('ta na porta 3000')
})

export default global;