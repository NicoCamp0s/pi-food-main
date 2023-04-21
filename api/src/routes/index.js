const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require("./recipeRouter.js");
const dietRouter = require("./dietRouter.js");
const recipesRouter = require("./recipesRouter.js")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", recipeRouter);
router.use("/diet", dietRouter);
router.use("/recipes", recipesRouter);

module.exports = router;
