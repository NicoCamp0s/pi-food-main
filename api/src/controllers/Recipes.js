const { Sequelize } = require("sequelize");
const { Recipe, Diets } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const axios = require("axios");

//* Solicito la informacion 
const allApiByQuery = async (query) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&query=${query}`);
        const data = response.data;
        console.log(data);
        if(data.hasOwnProperty("totalResults") && data.totalResults) {
            const rec = data.results.map(rec => ({
                        id: rec.id,
                        name: rec.title,
                        image: rec.image,
                        dietTypes: rec.diets.map(d => {return {name: d}}),
                        summary: rec.summary, 
                        healthScore: rec.healthScore,
                        steps: rec.analyzedInstructions,
                        time: rec.readyInMinutes,
                        dishTypes: rec.dishTypes.map(d => {return {name: d}})
                }))
                return rec;
            } else {
                return [];
            }
    } catch (error) {
        console.log(error);
        return "Error, no se pudo encontrar la receta solicitada"
    }
}

const getApiById = async (id) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`);
        const data = response.data;

        //! La propiedad code se refiere al codigo de estado HTTP devuelto por la API
        if(data.code) return false;
        return {
          id: data.id,
          name: data.title,
          image: data.image,
          summary: data.summary,
          dietTypes: data.diets,
          healthScore: data.healthScore,
          dishTypes: data.dishTypes,
          //? solamente traigo los pasos a seguir del metodo de realizado
          steps: data.analyzedInstructions[0]?.steps.map((s) => { return s.step; }),
          //! REVISAR POR AGREGAR ALGO
        //   ingredients: data.analyzedInstructions[0]?.ingredients.map((i) => { return i.name})
        }
    } catch (err) {
        return "Error, no se puedo encontrar el id solicitado";
    }
}

const allDbByQuery = async (query) => {
    const recipes = await Recipe.findAll({
        where: {
            name: {[Op.iLike]: `${query}`}
        }
    })
    return recipes !== null && recipes !== undefined ? recipes : false;
}

const getDbByid = async(id) => {
    const recipes = await Recipe.findByPk(id);
    return recipes !== null && recipes !== undefined ? recipes : false;
}

const getAllDb = async() => {
    const recipes = await Recipe.findAll({
       include: {
        model: Diets,
        attributes: ["name"],
        through: {
            attributes: [],
        }
       }
    })
    // return rec !== null && rec !== undefined ? rec : false;
    recipes.length ? recipes : false;
}

module.exports = {
    allApiByQuery,
    getApiById,
    allDbByQuery,
    getDbByid,
    getAllDb
}