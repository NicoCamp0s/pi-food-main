import * as act from "./actions";

const inicialState = {
    recipes: [],
    diets: [],
    createRecipe: [],
    recipeDetail: [],
}

const reducer = (state = inicialState, action) => {
    switch(action.type) {
        //!agregar el case  POST

        case act.GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }

        case act.GET_RECIPES_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        
        case act.CREATE_RECIPE:
            return {
                ...state,
                createRecipe: action.payload
            }

        case act.GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case act.GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }

        case act.CLEAR_DETAIL:
            return {
                ...state,
                recipeDetail: [],
            }

        case act.FILTER_BY_DIETS:
            const recipes = state.recipes
            console.log(recipes);
            console.log(recipes[0].dietTypes);
            console.log(action.payload);
            const recipesWithDiet = action.payload === 'all' 
            ? recipes 
            : recipes.map(rec => {
                let filterDiet = rec.dietTypes.map(d => d)
                if (filterDiet.includes(action.payload)) return rec
            })
            return {
                ...state,
                recipes: recipesWithDiet
            }

        case act.ORDER_BY_NAME:
            const recipesSorted = action.payload === 'asc' ?
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
            return {
                ...state,
                recipes: recipesSorted
            }

        case act.ORDER_BY_SCORE:
            const recipesByScore = action.payload === 'asc' ?
                state.recipes.sort((a, b) => {
                    if (a.healthScore > b.healthScore) return 1;
                    if (b.healthScore > a.healthScore) return -1;
                    return 0;
                }) :
                state.recipes.sort((a, b) => {
                    if (a.healthScore > b.healthScore) return -1;
                    if (b.healthScore > a.healthScore) return 1;
                    return 0;
                });
            return {
                ...state,
                recipes: recipesByScore
            }
        
        default: 
        return {...state};
    }
}

export default reducer;