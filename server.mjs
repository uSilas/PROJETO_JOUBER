import express from 'express';
import {router_cliente} from './routes/cliente_rota.mjs';
import cors from 'cors';

const port = 3000;
const global = express();

global.use(cors())
global.use(express.json())
global.use(express.urlencoded({extended: true}))

global.use('/', router_cliente);

global.listen(3000,()=>{
  console.log('ta na porta 3000')
})

export default global;