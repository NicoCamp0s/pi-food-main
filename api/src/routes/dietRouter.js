const { Router } = require("express");
const getRouter = Router();
const { getDiets, addDb } = require("../controllers/Diets");

getRouter.get('/', async (req, res)=>{
  try {
      await addDb();
      const diets = await getDiets();
      const dietName = diets.map(diet => diet.name)
      res.status(200).json(dietName);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
});

module.exports = getRouter;