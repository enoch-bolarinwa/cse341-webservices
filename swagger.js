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
        url: 'https://cse341-ix1i.onrender.com',
        description: 'Production server'
       
      },
      {
         url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Path to route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;