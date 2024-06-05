import{Contact }from "../db/Models/Contact.js";
export const getContacts = async () => {
   const contacts = await Contact.find();
   return contacts;
};
export const getContactById = async (id) => {
    const contact = await Contact.findById(id);
    return contact;
};

