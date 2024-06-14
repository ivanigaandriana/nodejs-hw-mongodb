// import createHttpError from "http-errors";
import{Contact }from "../db/Models/Contact.js";
export const getAllContacts = async () => {
   const contacts = await Contact.find({});
   return contacts;
};
export const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};

export const createContacts = async (payload) => {
    const contact = await Contact.create(payload);
    return contact;
};
export const deleteContact = async (contactId) => {
    const contact = await Contact.findByIdAndDelete(contactId);
    return contact;
};
export const updateContact = async (id, payload, options={}) => {
    const rawContact = await Contact.findOneAndUpdate({_id:id}, payload, {new: true,includeResultMetadata: true,...options});
if(!rawContact || rawContact.value) return null;

    return {
        contact:rawContact.value,
        isNew:Boolean(rawContact?.lastErrorObject?.upserted),
    };
};
