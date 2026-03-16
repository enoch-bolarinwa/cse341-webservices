const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// Routes WITHOUT Swagger comments for now (to test if routes work)
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;