import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {env} from './utils/evn.js';
import { ENV_VARS } from './constans/index.js';
import { initMongoDb } from './db/initMongoConnection.js';
import {getContacts, getContactById} from './services/contacts.js';
const PORT = env(ENV_VARS.PORT, 3000);
console.log('PORT',PORT);
export const startServer=()=>{

initMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(pino({transport:{target:'pino-pretty'}}));

app.get('/contacts',async (req, res) => {
const contacts = await getContacts();
return res.status(200).json(contacts);
});
app.get('/contacts/:contactId',async (req, res) => {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);
    return res.status(200).json(contact);
});
app.use('*', (req, res) => {
    res.status(404).json({message:'Not found'});
});
app.use((error, req, res) => {
    res.status(500).json({message:error.message});
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
};

