// import createHttpError from "http-errors";
<<<<<<< HEAD
import{Contact }from "../db/Models/Contact.js";
export const getAllContacts = async () => {
   const contacts = await Contact.find({});
=======
import{ContactsCollection }from "../db/Models/Contact.js";
export const getAllContacts = async () => {
   const contacts = await ContactsCollection.find({});
>>>>>>> fc68dc4ace073748ad38ee6182170e26cae2a588
   return contacts;
};
export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContacts = async ({name, email, phoneNumber, contactType, isFavourite}) => {
    const newContact= new ContactsCollection({name, email, phoneNumber, contactType, isFavourite});
    await newContact.save();
    return newContact;
};
export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete(contactId);
    return contact;
};
export const updateContact = async (id, payload, options={}) => {
    const rawContact = await ContactsCollection.findOneAndUpdate(
        {_id:id}, payload, {new: true,includeResultMetadata: true,...options});
if(!rawContact || rawContact.value) return null;

    return {
        contact:rawContact.value,
        isNew:Boolean(rawContact?.lastErrorObject?.upserted),
    };
};
