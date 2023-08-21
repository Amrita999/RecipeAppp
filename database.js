
const { Sequelize } = require('sequelize');

// Replace these values with your actual PostgreSQL database configuration
const DB_NAME = 'RecipeApp';
const DB_USER = 'postgres';
const DB_PASSWORD = 'postgres';
const DB_HOST = 'localhost';
const DB_PORT = 5432; 

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres', 
  logging: false, 
});

module.exports = sequelize;