const { Router } = require("express");
const getRouter = Router();
const { allApiByQuery, getApiById, allDbByQuery, getDbByid } = require("../controllers/Recipes.js");
require('dotenv').config();

//por ID
getRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).send("No se encontro un ID");

    let recipe = await getApiById(id);
        if(recipe) {
            return res.status(200).json({recipe});
        } else {
            let DBrecipe = await getDbByid(id);
            if(DBrecipe) return res.status(200).json({DBrecipe});
            else return res.status(400).send("El ID proporcionado no es válido");
        } 
        // return res.status(404).send("El ID proporcionado no es válido");
    
    //! AGREGAR EL DE BASE DE DATOS
    
})

//por query
getRouter.get("/", async (req, res) => {

    const { name } = req.query;

    // compruebo si name es nulo o vacio
    if(!name || !name.trim()) {
        return res.status(404).send({message: "Completar el casillero"});
    } else {
    // obtengo las recetas de la api y de la base de datos
    const [apiRecipes, dbRecipes] = await Promise.all([
        allApiByQuery(name),
        allDbByQuery(name)
      ]);
  
      // lo concateno
      const allRecipes = apiRecipes.concat(dbRecipes);
      console.log(allRecipes);

      // compruebo si tengo algo dentro de la variable
      if (allRecipes.length === 0) {
        return res.status(404).json({ message: 'Receta no encontrada' });
      }
  
      return res.status(200).json(allRecipes);
    }
}) 
  
    //     const { name } = req.query;

    //     if (!name || !name.trim()) {
    //       return res.status(400).send({ message: "Ingresar un nombre valido" });
    //     }
      
    //     const ApiRecipes = await allApiByQuery(name);
    //     console.log(ApiRecipes);
    //     const DBRecipes = await allDbByQuery(name);
    //     console.log(DBRecipes);
    //     const allRecipes = [];
      
    //     if (Array.isArray(ApiRecipes)) {
    //       ApiRecipes.forEach(recipe => createDiet(recipe.dietTypes));
    //       allRecipes.push(...ApiRecipes);
    //     }
      
    //     allRecipes.push(...DBRecipes);
      
    //     return allRecipes.length ? res.status(200).json(allRecipes.flat()) : res.status(404).json({ message: "No se encontraron recetas" });
      
    module.exports = getRouter