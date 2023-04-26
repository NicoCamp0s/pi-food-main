const { Diets } = require("../db");
const { Sequelize } = require("sequelize")

const DB_Diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegeterian",
    "Lacto-Vegetarian",
    "lacto ovo vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
]

// const allDiets = async function(){
//     const dietList = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=60&addRecipeInformation=true`);
//     const repeated = await dietList.data.results.map( d => d.diets).flat(1);
//     return [... new Set(repeated)]
// };

const addDb = async () => {
    await Promise.all(DB_Diets.map(diet => {
        return Diets.findOrCreate({
            where: {
                name: diet, 
            }
        })
    }))
}

const createDiet = async (dietNames) => {
    if (dietNames) {
        await Promise.all(dietNames.map(d => {
            return Diets.findOrCreate({
                where: {
                    name: d,
                }
            })
        }))
    }
}

const getDiets = async () => {
    const diets = await Diets.findAll();
    return diets;
}

 module.exports = {
    addDb,
    createDiet,
    getDiets
}
