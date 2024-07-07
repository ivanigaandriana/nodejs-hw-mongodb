
import { SORT_ORDER } from "../constans/index.js";
import{Contacts }from "../db/Models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { saveFile } from "../utils/saveFile.js";

import { env } from "../utils/evn.js";
import saveFileToLocalStorage from "../utils/saveFileToLocalStorage.js";
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";
import { ENV_VARS } from "../constans/index.js";

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = "_id",
    sortOrder = SORT_ORDER.ASC,
    userId
  }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = Contacts.find({  userId });

    const [contactsCount, contacts] = await Promise.all([
      Contacts.countDocuments({  userId }),
      contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec()
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return { contacts, ...paginationData };
  };

  export const getContactById = async (contactId, userId) => {
    const contact = await Contacts.findOne({ _id: contactId,  userId });
    return contact;
  };

  export const createContacts = async ({photo, ...payload}, userId) => {
    // const { photo, ...restPayload } = payload;

    // const photoUrl = photo ? await saveFile(photo) : null;

    if (!photo) return;

    let photoUrl;

    if (photo) {
        if (env(ENV_VARS.ENABLE_CLOUDINARY) === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToLocalStorage(photo);
        }
    }
    const contact = await Contacts.create({
      ...payload,
      userId: userId,
      photo: photoUrl,
  });

  return contact;
};
// const url =await saveFile(photo);

//     const contact = await Contacts.create({
//         ...payload,
//         userId,
//         photo: url
//     });

//     return contact;
// };

  export const deleteContact = async (contactId, userId) => {
    const contact = await Contacts.findOneAndDelete({ _id: contactId,  userId });
    return contact;
  };


  export const updateContact = async (contactId, payload) => {
    const { photo, ...restPayload } = payload;
    const updateFields = { ...restPayload };
    if (photo) {
        const photoUrl = await saveFile(photo);
        updateFields.photo = photoUrl;
    }
    const updatedContact = await Contacts.findByIdAndUpdate(contactId, updateFields, { new: true });

    return updatedContact;
};
