import express from 'express';
import dotenv from 'dotenv/config'
import router from './Routes/router.mjs';
import { dto } from './Middlewares/DTOMiddleware.mjs';

const app = express();

app.use(express.json());

app.use(dto);

app.use(router);

app.listen(process.env.PORT, () => {
 console.log(`Aplicação rodando`);
});