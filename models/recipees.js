const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Recipe = sequelize.define('Recipes', {
  recipeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  selectedIngredients: {
    type: DataTypes.TEXT, // Store selected ingredients as JSON data
    allowNull: false
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Recipe;
