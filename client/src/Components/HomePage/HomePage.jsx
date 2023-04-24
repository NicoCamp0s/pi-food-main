import css from "./HP.module.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paginate from "../Paginate/Paginate";
import * as act from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {

    const dispatch = useDispatch();
    const rec = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    const [home, setHome] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);    // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); // self-explanatory
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = rec.slice(firstRecipe, lastRecipe); // las 9 recetas que se iran mostrando en cda pág

    useEffect(() => {
        dispatch(act.getRecipes());
    }, [dispatch])

    useEffect(() => {
        dispatch(act.getDiets());
    }, [dispatch])
    
    const paginate = (number) => {
        setCurrentPage(number)
    };

    return (
        <div>
            <h1>Este es el homePage</h1>
            <Link to="/form"><button>Crear receta</button></Link>
            <div>
                <Paginate
                    recipesPerPage={recipesPerPage}
                    recipes={rec?.length}
                    paginate={Paginate}
                    currentPage={currentPage}
                />
                <div className={css.cardsGrid}>
                    {
                        currentRecipes && currentRecipes.map(el => {
                            return (
                                <Card img={el.image} name={el.name} diet={el.diets} id={el.id} key={el.id} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default HomePage;