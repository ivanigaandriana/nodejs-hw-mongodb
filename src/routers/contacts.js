
import { Router } from 'express';

import {getAllContactsController, getContactByIdController, createrContactsController, deleteContactController, upsertContactController, patchContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateMongoId from '../middlewares/validateMongoId.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import  {upload } from '../middlewares/uploads.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
const contactsRouter = Router();
contactsRouter.use('/', authenticate);
contactsRouter.use('/:contactId',validateMongoId('contactId'));
contactsRouter.get('/',ctrlWrapper(getAllContactsController));

contactsRouter.get('/:contactId',ctrlWrapper(getContactByIdController));
contactsRouter.post('/',
    validateBody(createContactSchema),
    upload.single('photo'),
ctrlWrapper(createrContactsController));
contactsRouter.delete('/:contactId',ctrlWrapper(deleteContactController));
contactsRouter.put('/:contactId',
    validateBody(updateContactSchema),
    upload.single('photo'),
    ctrlWrapper(upsertContactController)
);
contactsRouter.patch('/:contactId',
    validateBody(updateContactSchema),
    upload.single('photo'),
    ctrlWrapper(patchContactController)
);

export default contactsRouter;
