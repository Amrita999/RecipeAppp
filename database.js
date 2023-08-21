const { Sequelize } = require('sequelize');

// Replace this URL with your actual PostgreSQL database URL
const DB_URL = 'postgres://amrita:OCR3cJA1whXZtevMoCSAoEASgkcsWnqk@dpg-cjhnegl1a6cs73eemeug-a.oregon-postgres.render.com/recipeapp_hgi3'

// Create Sequelize instance with SSL configuration
const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
ssl: {
      require: true,   // Require SSL
      rejectUnauthorized: false, // Bypass self-signed certificates if needed
    },
  },
});

module.exports = sequelize;
