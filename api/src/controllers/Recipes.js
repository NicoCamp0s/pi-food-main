const { Sequelize } = require("sequelize");
const { Recipe, Diets } = require("../db");
const { Op } = require("sequelize");
const { API_KEY, API_KEY2, API_KEY3 } = process.env;
const axios = require("axios");
const DATA = require("../../../client/data.json");

//* Solicito la informacion 
const allApiData = async function(){
   try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=30&addRecipeInformation=true`);
        const data =  await apiUrl.data.results.map(rec => {
           return {
            id: rec.id,
            name: rec.title,
            summary: rec.summary,
            dietTypes: rec.diets,
            healthScore: rec.healthScore,
            image: rec.image,
            dishTypes: rec.dishTypes.map(d => {return {name: d}}),
            steps: rec.analyzedInstructions[0]?.steps.map((s) => { return s.step; })
        }
    })
    return data;
    
    // const data = {...DATA, results: DATA.results.map(rec =>{
    //     return {
    //         id: rec.id,
    //         name: rec.title,
    //         summary: rec.summary,
    //         dietTypes: rec.diets.map( d => { return { name: d}}),
    //         healthScore: rec.healthScore,
    //         image: rec.image,
    //         dishTypes: rec.dishTypes.map(d => {return {name: d}}),
    //         steps: rec.analyzedInstructions[0]?.steps.map(s => {
    //             return `<b>${s.number}</b> ${s.step}<br>`
    //         })
    //     }
    // })}
    // return data;
   } catch (error) {
    return error.message;
   }
}

const allApiByQuery = async (query) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30&query=${query}`);
        const data = response.data;
        // const data = {...DATA, results: DATA.results.filter(data => data.title.toLowerCase().includes(query))} 
        //console.log(data);
        if(data.totalResults) {
            const rec = data.results.map(rec => ({
                        id: rec.id,
                        name: rec.title,
                        image: rec.image,
                        dietTypes: rec.diets,
                        summary: rec.summary,
                        healthScore: rec.healthScore,
                        steps: rec.analyzedInstructions,
                        dishTypes: rec.dishTypes.map(d => {return {name: d}})
                }))
                return rec;
            } else {
               return [];
            }
    } catch (error) {
        console.log(error);
        return "Error, the requested recipe could not be found"
    }
}

const getApiById = async (id) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`);
        const data = response.data;
        // //! La propiedad code se refiere al codigo de estado HTTP devuelto por la API
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
          steps: data.analyzedInstructions[0]?.steps.map((s) => { return s.step; })
        }
    } catch (err) {
        return "Error, the requested id could not be found";
    }
}

const allDbByQuery = async (query) => {
    const recipes = await Recipe.findAll({
        where: {
            name: {[Op.iLike]: `${query}`}
        }
    })
    // recipes.length ? recipes : [];
    return recipes;
}

const getDbByid = async(id) => {
    const recipes = await Recipe.findByPk(id);
    return recipes;
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
    return recipes;
}

module.exports = {
    allApiByQuery,
    getApiById,
    allDbByQuery,
    getDbByid,
    getAllDb,
    allApiData
}