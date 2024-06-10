
import { Router } from 'express';
import {getAllContactsControler, getContactByIdControler, createrContactsController, deleteContactController, upsertContactController, patchtContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts',ctrlWrapper(getAllContactsControler));

router.get('/contacts/:contactId',ctrlWrapper(getContactByIdControler));
router.post('/contacts',ctrlWrapper(createrContactsController));
router.delete('/contacts/:contactId',ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId',ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId',ctrlWrapper(patchtContactController));

export default router;
