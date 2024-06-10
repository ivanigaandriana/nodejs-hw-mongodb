import {Contact} from '../db/Models/Contact.js';

export const getContacts = async () => {
    return await Contact.find();
};

export const getContactById = async (id) => {
    return await Contact.findById(id);
};

