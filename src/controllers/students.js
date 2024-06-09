import {getContacts, getContactById} from '../services/contacts.js';
import createHttpError from 'http-errors';
export const getAllContactsControler = async (req, res) => {
    const contacts = await getContacts();
     res.status(200).json(contacts);
    };

    export const getContactByIdControler = async (req, res, next) => {
        const {contactId} = req.params;
        const contact = await getContactById(contactId);
        if(!contact) {
            next(createHttpError(404,'Contact Not found'));
            return;
        }
         res.status(200).json(contact);
    };
