import axios from "axios";
const { API_KEY } = process.env;
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_NAME ="GET_RECIPES_NAME";
export const GET_DIETS = "GET_DIETS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const getDiets = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/diet`);
            dispatch({
                type: GET_DIETS,
                payload: response.data.map(d => d.replace("_", " "))
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
    return async function(dispatch) {
      const response = await axios.get(`http://localhost:3001/recipes?query=${query}`);
      const byName = response.data.filter(rec => {
        if (rec.name.toLowerCase().includes(query.toLowerCase())) {
            return rec
        } 
      })
      dispatch({
        type: GET_RECIPES_NAME,
        payload: byName
      });
    };
  };
  

export const createrRecipe = ({name, summary, steps, image, dietTypes, healthScore}) => {
    return async function(dispatch) {
        const post = await axios.get(`http://localhost:3001/recipe`, {
            name, 
            summary, 
            steps, 
            image, 
            dietTypes, 
            healthScore, 
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

export const filterByDiets = (d) => {
    return function (dispatch) {
        dispatch({
            type: FILTER_BY_DIETS,
            payload: d
        })
    }
}

export const orderByName = (n) => {
    return function (dispatch) {
        dispatch({
            type: ORDER_BY_NAME,
            payload: n
        })
    }
}

export const orderByScore = (s) => {
    return function (dispatch) {
        dispatch({
            type: ORDER_BY_SCORE,
            payload: s
        })
    }
}