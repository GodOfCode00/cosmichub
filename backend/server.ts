import express from 'express';
import UserRouter from './api/user';
import { connection } from './config/database';

const app = express();
console.log(process.env.MONGOURI);
connection();

app.use(express.json());
app.use(express.static('public'));

app.use('/cosmichub/user',UserRouter);

app.all('*',(request: express.Request,response: express.Response)=> {
    response.send('Cosmic Hub');
});

app.listen(Number(process.env.PORT),()=> {
    console.log(`Server running on ${process.env.PORT}....`)
});