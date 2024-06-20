
import { Router } from 'express';

import {getAllContactsController, getContactByIdController, createrContactsController, deleteContactController, upsertContactController, patchContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateMongoId from '../middlewares/validateMongoId.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
const contactsRouter = Router();
contactsRouter.use('/:contactId',validateMongoId('contactId'));
contactsRouter.get('/',ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId',ctrlWrapper(getContactByIdController));
contactsRouter.post('/',validateBody(createContactSchema),ctrlWrapper(createrContactsController));
contactsRouter.delete('/:contactId',ctrlWrapper(deleteContactController));
contactsRouter.put('/:contactId',ctrlWrapper(upsertContactController));
contactsRouter.patch('/:contactId',validateBody(updateContactSchema),ctrlWrapper(patchContactController));

export default contactsRouter;
