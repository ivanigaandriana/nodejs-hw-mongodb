import createHttpError from 'http-errors';
// import { Types } from 'mongoose';
import {
  getAllContacts,
  getContactById,
  createContacts,
  deleteContact,
  updateContact
} from '../services/contacts.js';
import {parsePaginationParams} from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortingParams.js';
import {parseFilterParams} from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
    try{
    const { page, perPage } =parsePaginationParams(req.query);
    const {sortBy, sortOrder} =parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder ,filter});
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts
    });}
    catch (error) {next(error);}
};

export const getContactByIdController = async (req, res, next) => {
    try{
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    if (!contact) {
        return next(createHttpError(404, `Contact with id ${contactId} Not found`));
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact
    });}
    catch (error) {next(error);}
};

export const createrContactsController = async (req, res, next) => {
    try{
    const contact = await createContacts(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact
    });}
    catch (error) {next(error);}
};

export const deleteContactController = async (req, res, next) => {
    try{
    const { contactId } = req.params;
    // if (!Types.ObjectId.isValid(contactId)) {
    //     return next(createHttpError(400, 'Invalid contact id!'));
    // }
    const contact = await deleteContact(contactId);
    if (!contact) {
        return next(createHttpError(404, 'Contact Not found'));
    }
    res.status(204).send();}
    catch (error) {next(error);}
};

export const upsertContactController = async (req, res, next) => {
    try{
    const { contactId } = req.params;
    // if (!Types.ObjectId.isValid(contactId)) {
    //     return next(createHttpError(400, 'Invalid contact id!'));
    // }
    const { isNew, contact } = await updateContact(contactId, req.body, { upsert: true });
    if (!contact) {
        return next(createHttpError(404, 'Contact not found'));
    }
    const status = isNew ? 201 : 200;
    res.status(status).json({
        status,
        message: `Successfully upserted a contact!`,
        data: contact,
    });}
    catch (error) {next(error);}
};

export const patchContactController = async (req, res, next) => {
    try{
    const { contactId } = req.params;
    // if (!Types.ObjectId.isValid(contactId)) {
    //     return next(createHttpError(400, 'Invalid contact id!'));
    // }

    
        const result = await updateContact(contactId, req.body);
        if (!result) {
            return next(createHttpError(404, 'Contact not found'));
        }
        res.json({ status: 200, message: "Successfully patched contact!", data: result });
    } catch (error) {
        next(error);
    }
};
