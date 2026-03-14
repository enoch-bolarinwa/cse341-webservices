require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/contacts', require('./routes/contacts'));
// app.use('/users', require('./routes/users'));  // When you create this

app.get('/', (req, res) => {
  res.send('Multiple Databases API');
});

// Initialize databases and start server
mongodb.initAllDatabases()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📊 All databases connected`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });