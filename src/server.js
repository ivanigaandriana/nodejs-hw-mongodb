import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {env} from './utils/evn.js';
import { ENV_VARS } from './constans/index.js';
import { initMongoDb } from './db/initMongoConnection.js';
import contactsRouter from './routers/contacts.js';
import  errorHandlerMiddlewere from './middleware/errorHandlerMiddlever.js';
import { notRoundMidlewer } from './middleware/notRoundMidlewer.js';
const PORT = env(ENV_VARS.PORT, 3000);
console.log('PORT',PORT);
export const startServer=()=>{

initMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(pino({transport:{target:'pino-pretty'}}));

app.use(contactsRouter);
app.use('*',notRoundMidlewer);
app.use(errorHandlerMiddlewere);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
};

