import * as act from "./actions";

const inicialState = {
    recipes: [],
    diets: [],
    createRecipe: [],
    recipeDetail: [],
    filterRD: []
}

const reducer = (state = inicialState, action) => {
    switch(action.type) {

        case act.GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }

        // case act.GET_RECIPES_NAME:
        //     return {
        //         ...state,
        //         recipes: action.payload
        //     }
        
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

        default: 
        return {...state};
    }
}

export default reducer;