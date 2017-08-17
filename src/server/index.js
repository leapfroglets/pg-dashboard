import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import * as errorHandler from './middlewares/errorHandler';

let app = express();
let PORT=4553;
dotenv.config();

app.set('port' , PORT);
app.use(bodyParser.json());
app.use(cors());

app.get('/' , (req , res ) => {
  res.json({
    message:'Welcome to the api',
    instruction:'/api to enter api'
  });
});

app.use('/api' , routes);

app.use(errorHandler.error);
app.use(errorHandler.notFound);

app.listen(app.get('port') , () => {
  console.log(`Port started: ${app.get('port')}`);  
})