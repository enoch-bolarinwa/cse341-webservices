const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'CSE341 Contacts API Documentation'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://your-app-name.onrender.com',
        description: 'Production server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Path to route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;