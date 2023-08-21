const express = require("express");
const app = express();

const Recipe = require('./models/recipees');
const sequelize = require('./database')

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");

app.set("views");

// const {Employee} = require('./employee');

app.locals.delimiters = "<% %>"; // This line allows the use of <%- include(filename) %> syntax in EJS
// Load CSS from the "public" directory
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/create",(req,res)=>{
    res.render("create");
})

app.post('/create', async (req, res) => {
  const { recipeName, instructions, selectedIngredients } = req.body;

  try {
    // Create a new recipe using Sequelize
    const recipe = await Recipe.create({
      recipeName,
      instructions,
      selectedIngredients: selectedIngredients
    });

    console.log('Recipe added:', recipe);

    res.redirect('/read'); // Redirect back to the read recipes page
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/read', async (req, res) => {
  try {
    // Fetch all recipes from the database using Sequelize
    const recipes = await Recipe.findAll();

    res.render('read', { recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/update/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Fetch the recipe from the database using Sequelize
    const recipe = await Recipe.findByPk(recipeId);

    res.render('update', { recipe });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/update/:id', async (req, res) => {
  const recipeId = req.params.id;
  const { recipeName, selectedIngredients, instructions } = req.body;

  try {
    // Update the recipe in the database using Sequelize
    await Recipe.update({
      recipeName,
      selectedIngredients: selectedIngredients,
      instructions
    }, {
      where: { id: recipeId }
    });

    res.redirect('/read'); // Redirect back to the read recipes page
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ...

app.get('/delete/:id', (req, res) => {
  const recipeId = req.params.id;
  res.render('delete', { recipeId });
});

app.post('/delete/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    // Delete the recipe from the database using Sequelize
    await Recipe.destroy({
      where: { id: recipeId }
    });

    res.redirect('/read'); // Redirect back to the read recipes page
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});