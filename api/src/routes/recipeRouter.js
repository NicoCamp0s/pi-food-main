const { Router } = require("express");
const postRouter = Router();
const { createDiet } = require("../controllers/Diets.js");

postRouter.post("/", async (req, res, next) => {
    try {
        const { name, summary, steps, image, dietTypes, healthScore, dishTypes } = req.body;
        
        if(!name || !summary || !steps || !dietTypes) {
            return res.status(400).send("Porfavor, indique name, summaty y steps para continuar")
        } else {
            const createRecipe = await Recipe.create({
                name, 
                summary, 
                steps, 
                image, 
                dietTypes, 
                healthScore
            })
            createDiet(dietTypes);
            return res.status(200).json({createRecipe});
        }
    } catch (error) {
        next(error)
    }
})

module.exports = postRouter