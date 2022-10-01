import "express-async-errors";
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import UserRouter from './api/user';
import { connection } from './config/database';
import ErrorHandler from "./middleware/error-handler";

const app = express();
connection();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

app.use('/cosmichub/user',UserRouter);

app.all('*',(request: express.Request,response: express.Response)=> {
    response.send('Cosmic Hub');
});
app.use(ErrorHandler);

app.listen(Number(process.env.PORT),()=> {
    console.log(`Server running on ${process.env.PORT}....`)
});