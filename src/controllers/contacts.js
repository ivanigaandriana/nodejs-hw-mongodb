import  createHttpError  from 'http-errors';
import { getAllContacts, getContactById, createContacts, deleteContact, updateContact } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
         message: 'Successfully found contacts!',
          data: contacts });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
        return next(createHttpError(404, 'Contact Not found'));
    }
    res.status(200).json({ status: 200, message: `Successfully found contact with id ${contactId}!`, data: contact });
};

export const createrContactsController = async (req, res) => {
    const contact = await createContacts(req.body);
    res.status(201).json({ status: 201, message: "Successfully created a contact!", data: contact });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
        return next(createHttpError(404, 'Contact Not found'));
    }
    res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body;
    const { isNew, contact } = await updateContact(id, body, { upsert: true });
    if (!contact) {
        return next(createHttpError(404, 'Contact not found'));
    }
    const status = isNew ? 201 : 200;
    res.status(status).json({
        status,
        message: `Successfully upserted a contact!`,
        data: contact,
    });
};

export const patchtContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
        return next(createHttpError(404, 'Contact Not found'));
    }
    res.json({ status: 200, message: "Successfully patched contact!", data: result });
};
