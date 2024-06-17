// import createHttpError from "http-errors";
import { SORT_ORDER } from "../constans/index.js";
import{ContactsCollection }from "../db/Models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
export const getAllContacts = async ({page=1,
    perPage=10,
    sortBy='_id',
    sortOrder=SORT_ORDER.ASC}) => {
    const limit=perPage;
    const skip= (page-1)*perPage;
    const contactsQuery = ContactsCollection.find();
//     const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
//    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]:sortOrder}).exec();
//    const paginationData = calculatePaginationData( contactsCount,perPage,page);
   const [contactsCount, contacts] = await Promise.all([ContactsCollection.find().merge(contactsQuery).countDocuments(),
   contactsQuery.skip(skip).limit(limit).sort({[sortBy]:sortOrder}).exec()]);
   const paginationData = calculatePaginationData( contactsCount,perPage,page);
   return {contacts, ...paginationData};
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
