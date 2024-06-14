// import createHttpError from "http-errors";
import{ContactsCollection }from "../db/Models/Contact.js";
export const getAllContacts = async () => {
   const contacts = await ContactsCollection.find({});
   return contacts;
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContacts = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete(contactId);
    return contact;
};
export const updateContact = async (id, payload, options={}) => {
    const rawContact = await ContactsCollection.findOneAndUpdate({_id:id}, payload, {new: true,includeResultMetadata: true,...options});
if(!rawContact || rawContact.value) return null;

    return {
        contact:rawContact.value,
        isNew:Boolean(rawContact?.lastErrorObject?.upserted),
    };
};
