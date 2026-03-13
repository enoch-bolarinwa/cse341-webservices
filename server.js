require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const app = express();
const routes = require('./routes');

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Database initialization failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Database connected`);
    });
  }
});




