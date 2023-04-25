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
];

const addDb = async () => {
    await Promise.all(DB_Diets.map(diet => {
        return Diets.findOrCreate({
            where: {
                name: diet, 
            }
        });
    }));
};

const createDiet = async (dietNames) => {
    if (dietNames) {
        await Promise.all(dietNames.map(d => {
            return Diets.findOrCreate({
                where: {
                    name: d,
                }
            });
        }));
    }
};

const getDiets = async () => {
    const diets = await Diets.findAll();
    return diets;
}

 module.exports = {
    addDb,
    createDiet,
    getDiets
}