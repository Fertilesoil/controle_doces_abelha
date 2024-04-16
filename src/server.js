import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import router from './Routes/router.mjs';
import { dto } from './Middlewares/DTOMiddleware.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import cookieParser from 'cookie-parser';
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(cors({
  credentials: true,
  origin: process.env.PERMITED_PORT
}));

app.use(express.json());

app.use(dto);

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log(`Aplicação rodando`);
});

