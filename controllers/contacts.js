const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts from CONTACTS database
const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getContactsDb();  // ← Get contacts database
    const result = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getContactsDb();  // ← Get contacts database
    const result = await db.collection('contacts').findOne({ _id: contactId });
    
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};