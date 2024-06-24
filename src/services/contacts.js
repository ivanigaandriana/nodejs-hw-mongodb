// import createHttpError from "http-errors";
import { SORT_ORDER } from "../constans/index.js";
import{ContactsCollection }from "../db/Models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = "_id",
    sortOrder = SORT_ORDER.ASC,
    userId
  }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find({  userId });

    const [contactsCount, contacts] = await Promise.all([
      ContactsCollection.countDocuments({  userId }),
      contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec()
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return { contacts, ...paginationData };
  };

  export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId,  userId });
    return contact;
  };

  export const createContacts = async ({ payload, userId }) => {
    const contact = await ContactsCollection.create({ ...payload,  userId });
    return contact;
  };

  export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId,  userId });
    return contact;
  };

  export const updateContact = async (contactId, updateData, userId) => {
    const contact = await ContactsCollection.findOneAndUpdate(
      { _id: contactId,  userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return contact;
  };
