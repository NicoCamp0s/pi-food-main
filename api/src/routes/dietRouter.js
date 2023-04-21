const { Router } = require("express");
const getRouter = Router();
const { getDiets } = require("../controllers/Diets");


getRouter.get('/', async (req, res)=>{
    const diets = await getDiets()
    return res.json({diets})
})

module.exports = getRouter;