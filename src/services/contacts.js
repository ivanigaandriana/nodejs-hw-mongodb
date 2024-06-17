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
export const updateContact = async (contactId, updateData) => {
    const contact = await ContactsCollection.findByIdAndUpdate(
        contactId,
        { $set: updateData },
        { new: true, runValidators: true }
    );
    return contact;
};
