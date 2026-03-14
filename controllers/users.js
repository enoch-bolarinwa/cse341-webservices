const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users from USERS database
const getAllUsers = async (req, res) => {
  try {
    const db = mongodb.getUsersDb();  // ← Get users database
    const result = await db.collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user
const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getUsersDb();  // ← Get users database
    const result = await db.collection('users').findOne({ _id: userId });
    
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser
};