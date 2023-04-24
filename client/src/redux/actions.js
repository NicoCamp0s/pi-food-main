import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME ="GET_RECIPES_NAME";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CURRENT_PAGE = "CURRENT_PAGE";

export const getDiets = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/diet`);
            dispatch({
                type: GET_DIETS,
                payload: response.data
            })
        } catch (error) {
            console.error(error);
        }
    } 
}

export const getRecipes = () => {
    return async function(dispatch) {

        try {
            const response = await axios.get(`http://localhost:3001/recipes`);
            dispatch({
                type: GET_RECIPES,
                payload: response.data
            })

        } catch (error) {
            console.error(error);
        }
    }
}

export const searchByName = (query) => {
    try {
        return async function(dispatch) {
            const response = await axios.get(`http://localhost/recipes?query=${query}`);
            dispatch({
                type: GET_RECIPES_NAME,
                payload: response.data
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export const createrRecipe = ({name, summary, steps, image, dietTypes, healthScore, dishTypes}) => {
    return async function(dispatch) {
        const post = await axios.get(`http://localhost:3001/recipes`, {
            name, 
            summary, 
            steps, 
            image, 
            dietTypes, 
            healthScore, 
            dishTypes
        });
        dispatch({
            type: CREATE_RECIPE,
            payload: post.data
        })
    }
}

export const getDetail = (id) => {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`)
            dispatch({
                type: GET_RECIPE_DETAIL,
                payload: response.data
            })

        } catch (error) {
             console.error(error);
        }
    }
}

export const clearDetail = () => {
    return function (dispatch) {
        dispatch({
            type: CLEAR_DETAIL,
        })
    } 
}