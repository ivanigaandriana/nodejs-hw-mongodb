import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {env} from './utils/evn.js';
import { ENV_VARS } from './constans/index.js';
import { initMongoDb } from './db/initMongoConnection.js';
import {getContacts, getContactById} from './services/contacts.js';
import errorHandlerMiddleware from './db/middlewares/errorHandlerMiddleware.js';
import notFoundMiddleware from './db/middlewares/notFoundMiddleware.js';

const PORT = Number(env(ENV_VARS.PORT, 3000));

export const startServer=()=>{

initMongoDb();
const app = express();
app.use(express.json());
app.use(cors());
app.use(pino({transport:{target:'pino-pretty'}}));

// app.get('/contacts',async (req, res) => {
// const contacts = await getContacts();
// return res.status(200).json(contacts);
// });
// app.get('/contact', (req, res) => {
//     res.status(200).json({ message: 'This is the contact endpoint' });
// });
// app.get('/contacts/:contactId',async (req, res) => {
//     const {contactId} = req.params;
//     const contact = await getContactById(contactId);
//     return res.status(200).json(contact);
// });
// app.use('*', (req, res) => {
//     res.status(404).json({message:'Not found'});
// });
// app.use((error, req, res) => {
//     res.status(500).json({message:error.message});
// });
// console.log(`Starting server on port ${PORT}`);
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(pino({ transport: { target: 'pino-pretty' } }));

    app.get('/contacts', async (req, res, next) => {
        try {
            const contacts = await getContacts();
            res.status(200).json({ status: 200, message: 'Successfully found contacts!', data: contacts });
        } catch (error) {
            next(error);
        }
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.status(200).json({ status: 200, message: `Successfully found contact with id ${contactId}!`, data: contact });
        } catch (error) {
            next(error);
        }
    });

    app.use('*', notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    console.log(`Starting server on port ${PORT}`);
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};
