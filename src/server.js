import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import mongoose from 'mongoose';
import {env} from './utils/evn.js';
import { ENV_VARS } from './constans/index.js';
import {getAllContacts, getContactById} from './services/contacts.js';
import  errorHandlerMiddleware from '../src/middlewares/errorHandlerMiddleware.js';
import notFoundMiddleware from '../src/middlewares/notFoundMiddleware.js';

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const startServer=()=>{
const app = express();
app.use(express.json());
app.use(cors());
app.use(pino({transport:{target:'pino-pretty'}}));

app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({  status: 200,
        message: 'Successfully found contacts!',
        data: contacts });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    console.log(`Received contactId: ${contactId}`);

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({status: 200,
        message: `Successfully found contact with id ${contactId}!`,
         data: contact });
    } catch (error) {
      next(error);
    }
  });
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

};
