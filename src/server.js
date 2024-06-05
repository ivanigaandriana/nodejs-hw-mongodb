import  express  from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import cors from "cors";
// import dotevn from "dotenv";
import {evn} from "./utils/evn.js";
import { ENV_VARS } from "./constans/index.js";
import {initMongoDb} from "./db/initMongoConnection.js";
import {getContacts, getContactById} from "./services/contacts.js";
import mongoose from "mongoose";


const logger = pino();
const httpLogger = pinoHttp({logger});
 export const setupServer = ()=>{
    initMongoDb();
const app = express();
app.use(cors());
app.use(httpLogger);

app.get('/contacts', async(req, res) => {
    const contacts = await getContacts();
return res.status(200).json(contacts);
});

app.get('/contacts/:contactId', async(req, res) => {
    const {contactId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(contactId)){
        throw new Error('Invalid contact id');
    }
    const contact = await getContactById(contactId);
return res.status(200).json(contact);
});
app.use('*', (req, res)=>{
    res.status(404).json({message: "Not found"});});
    const PORT =evn(ENV_VARS.PORT, 3000);
    // process.env.PORT || 3000;
    console.log('PORT', PORT);
    app.use((err,req, res)=>{
res.status(500).join({message:'Someting went wrong'});
    });
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    });};
