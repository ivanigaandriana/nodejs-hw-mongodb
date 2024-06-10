import {getContacts, getContactById, createrContacts, deleteContact, updatesContact} from '../services/contacts.js';
import createHttpError from 'http-errors';
export const getAllContactsControler = async (req, res) => {
    const contacts = await getContacts();
     res.status(200).json({ status: 200,
        message: 'Successfully found contacts!', data: contacts });
    };

    export const getContactByIdControler = async (req, res, next) => {
        const {contactId} = req.params;
        const contact = await getContactById(contactId);
        if(!contact) {
            next(createHttpError(404,'Contact Not found'));
            return;
        }
         res.status(200).json({ status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact, });
    };
 export const createrContactsController = async (req, res) => {
    const contact = await createrContacts(req.body);
     res.status(201).json({status:201, message:"successfuly create contact!", data:contact});
    };
export const deleteContactController = async (req, res, next) => {
    const {contactId} = req.params;
    const contact = await deleteContact(contactId);
    if(!contact) {
        next(createHttpError(404,'Contact Not found'));
        return;
    }
    res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
    const {contactId} = req.params;
    const  result = await updatesContact(contactId, req.body,{upsert: true});
    if(!result) {
        next(createHttpError(404,'Contact Not found'));

    }
    const status = result.isNew ? 201 : 200;
    res.status(status).json({status,
        message: `Successfully upserted a contact!`,
        data: contact,});
};
export const patchtContactController = async (req, res, next) => {
    const {contactId} = req.params;
    const  result = await updatesContact(contactId, req.body);
    if(!result) {
        next(createHttpError(404,'Contact Not found'));
        return;
    }
    res.json({status:200, message:"successfuly patched contact!", data:result.contact,});
};
