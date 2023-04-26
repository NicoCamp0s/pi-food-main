const { Router } = require("express");
const getRouter = Router();
const cts = require("../controllers/Recipes.js");
require('dotenv').config();

//por ID
getRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
      return res.status(400).json({ error: "El parámetro ID es requerido" });
  }

  try {
      let recipe = await cts.getApiById(id);
      console.log(recipe);
      if(recipe) {
          return res.status(200).json({ recipe });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocurrió un error al obtener la receta de la API externa" });
  }

  try {
      let DBrecipe = await cts.getDbByid(id);
      if(DBrecipe) {
          return res.status(200).json({ recipe: DBrecipe });
      } else {
          return res.status(400).json({ error: "El ID proporcionado no es válido" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocurrió un error al obtener la receta de la base de datos" });
  }
});

//por query
getRouter.get("/", async (req, res) => {
    const { name } = req.query;
      try {
            // compruebo si name es nulo o vaci
    if(name) {
      // obtengo las recetas de la api y de la base de datos
      const [apiRecipes, dbRecipes] = await Promise.all([
        cts.allApiByQuery(name),
        cts.allDbByQuery(name),
      ]);
      // lo concateno
      const allRecipes = apiRecipes.concat(dbRecipes);
      console.log(allRecipes);
      // compruebo si tengo algo dentro de la variable
      if (allRecipes.length === 0) {
        return res.status(404).json({ message: 'recipe not found' });
      } else return res.status(200).json(allRecipes);
    } else {
      const data = await cts.allApiData()
      return res.status(200).json(data);
    }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred on the server' });
      }
})



module.exports = getRouter