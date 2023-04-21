const { Router } = require("express");
const postRouter = Router();
const { createDiet } = require("../controllers/Recipes.js");

postRouter.post("/", async (req, res, next) => {
    try {
        const { name, summary, steps, image, dietTypes, score, healthScore, time, dishTypes } = req.body;
        
        if(!name || !summary || !steps) {
            return res.status(400).send("Porfavor, indique name, summaty y steps para continuar")
        } else {
            const createRecipe = await Recipe.create({
                name, 
                summary, 
                steps, 
                image, 
                dietTypes, 
                score, 
                healthScore, 
                time,
                dishTypes
            })
            createDiet(dietTypes);
            return res.status(200).json(createRecipe);
        }
    } catch (error) {
        next(error)
    }
    
})

module.exports = postRouter