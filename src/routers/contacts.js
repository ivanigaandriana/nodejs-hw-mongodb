
import { Router } from 'express';

import {getAllContactsController, getContactByIdController, createrContactsController, deleteContactController, upsertContactController, patchContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateMongoId from '../middlewares/validateMongoId.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
const router = Router();
router.use('/contacts/:contactId',validateMongoId('contactId'));
router.get('/contacts',ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId',ctrlWrapper(getContactByIdController));
router.post('/contacts',validateBody(createContactSchema),ctrlWrapper(createrContactsController));
router.delete('/contacts/:contactId',ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId',ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId',validateBody(updateContactSchema),ctrlWrapper(patchContactController));

export default router;
