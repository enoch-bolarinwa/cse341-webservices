require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');  // ← ADD THIS
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/contacts', require('./routes/contacts'));

// Root route
app.get('/', (req, res) => {
  res.send('CSE341 Contacts API - Visit /api-docs for documentation');
});

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('❌ Failed to initialize database:', err.message);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📊 Database connected`);
      console.log(`📚 API Docs available at http://localhost:${port}/api-docs`);
    });
  }
});