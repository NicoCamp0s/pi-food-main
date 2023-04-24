const { Router } = require("express");
const getRouter = Router();
const { getDiets } = require("../controllers/Diets");


getRouter.get('/', async (req, res)=>{
    try {
        const diets = await getDiets();
        res.status(200).json(diets);
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
      }
    });

module.exports = getRouter;