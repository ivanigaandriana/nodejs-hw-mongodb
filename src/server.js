import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {env} from './utils/evn.js';
import { ENV_VARS } from './constans/index.js';
// import { initMongoDb } from './db/initMongoConnection.js';
import rootRouter from './routers/index.js';
import  errorHandlerMiddleware from './middlewares/errorHandlerMiddlever.js';
import  notFoundMiddleware from './middlewares/notRoundMidlewer.js';
import cookieParser from 'cookie-parser';


const PORT =Number( env(ENV_VARS.PORT, 3000));
// console.log('PORT',PORT);
export const startServer=()=>{

// initMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(pino({transport:{target:'pino-pretty'}}));

app.use(rootRouter);
app.use('*',notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
};
