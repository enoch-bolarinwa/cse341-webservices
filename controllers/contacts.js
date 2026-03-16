const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact by ID
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
    
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new contact (POST)
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact (PUT)
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDatabase().collection('contacts').replaceOne(
      { _id: contactId },
      contact
    );
    
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact (DELETE)
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    
    const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
    
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};