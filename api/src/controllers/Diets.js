const { Diets } = require("../db");
const { Sequelize } = require("sequelize")

const DB_Diets = [
    "Gluten_Frame",
    "Ketogenic",
    "Vegeterian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "pescetarian",
    "Paleo",
    "Primal",
    "Low_FODMAP",
    "Whole30"
]

const addDb = () => {
    DB_Diets.forEach(diet => {
        Diets.findOrCrate({
            where: {
                name: diet, 
            }
        })
    })
}

const createDiet = () => {
    if(Diets) {
        Diets.forEach(d => {
            Diets.findOrCrate({
                where: {
                    name: d,
                }
            })
        })
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