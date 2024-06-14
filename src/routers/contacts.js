
import { Router } from 'express';
<<<<<<< HEAD

import {getAllContactsController, getContactByIdController, createrContactsController, deleteContactController, upsertContactController, patchContactController} from '../controllers/contacts.js';
=======
import {getAllContactsController, getContactByIdController, createrContactsController, deleteContactController, upsertContactController, patchtContactController} from '../controllers/contacts.js';
>>>>>>> fc68dc4ace073748ad38ee6182170e26cae2a588
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts',ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId',ctrlWrapper(getContactByIdController));
router.post('/contacts',ctrlWrapper(createrContactsController));
router.delete('/contacts/:contactId',ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId',ctrlWrapper(upsertContactController));
router.patch('/contacts/:contactId',ctrlWrapper(patchContactController));

export default router;
