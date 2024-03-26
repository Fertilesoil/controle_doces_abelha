import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import router from './Routes/router.mjs';
import { dto } from './Middlewares/DTOMiddleware.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(dto);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Aplicação rodando`);
});