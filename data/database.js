const { MongoClient } = require('mongodb');
require('dotenv').config();

let contactsDb;
let usersDb;

// Initialize Contacts Database
const initContactsDb = async () => {
  try {
    if (contactsDb) {
      console.log('Contacts database already initialized');
      return contactsDb;
    }

    const contactsClient = await MongoClient.connect(process.env.MONGODB_URI_CONTACTS);
    contactsDb = contactsClient.db();
    console.log('✅ Contacts database connected');
    return contactsDb;
  } catch (error) {
    console.error('❌ Contacts database connection failed:', error);
    throw error;
  }
};

// Initialize Users Database
const initUsersDb = async () => {
  try {
    if (usersDb) {
      console.log('Users database already initialized');
      return usersDb;
    }

    const usersClient = await MongoClient.connect(process.env.MONGODB_URI_USERS);
    usersDb = usersClient.db();
    console.log('✅ Users database connected');
    return usersDb;
  } catch (error) {
    console.error('❌ Users database connection failed:', error);
    throw error;
  }
};

// Initialize ALL databases
const initAllDatabases = async () => {
  try {
    await initContactsDb();
    await initUsersDb();
    console.log('✅ All databases initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Getter functions
const getContactsDb = () => {
  if (!contactsDb) {
    throw new Error('Contacts database not initialized. Call initContactsDb() first.');
  }
  return contactsDb;
};

const getUsersDb = () => {
  if (!usersDb) {
    throw new Error('Users database not initialized. Call initUsersDb() first.');
  }
  return usersDb;
};

module.exports = {
  initContactsDb,
  initUsersDb,
  initAllDatabases,
  getContactsDb,
  getUsersDb
};