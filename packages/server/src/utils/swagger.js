const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Web App Gallery',
    version: '1.0.0',
    description: 'API for Web App Gallery',
  },
  server: [
    {
      url: 'http://localhost:300',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['**/*.router.js'],
};

module.exports = swaggerJsdoc(options);
