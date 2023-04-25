import css from "./HP.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card.jsx";
import Paginate from "../Paginate/Paginate";
import * as act from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

const HomePage = () => {

    const dispatch = useDispatch();
    const rec = useSelector(state => state.recipes); //! lo mismo que pasa en detail
    const diets = useSelector(state => state.diets);
    const [home, setHome] = useState(true)
    const [currentPage, setCurrentPage] = useState(1); // pagina que ira cambiando
    const [recipesPerPage, setRecipesPerPage] = useState(9); 
    const lastRecipe = recipesPerPage * currentPage; //9     // indice ultima receta renderizada
    const firstRecipe = lastRecipe - recipesPerPage; //0         // indice primera receta renderizada
    const currentRecipes = rec?.slice(firstRecipe, lastRecipe);// las 9 recetas que se iran mostrando en cda pág
    
    useEffect(() => {
        dispatch(act.getRecipes());
    }, [dispatch])

    useEffect(() => {
        dispatch(act.getDiets());
    }, [dispatch])

    ;

    const paginate = (number) => {
        setCurrentPage(number)
    };

    const handleFilterByDiets = (e) => {
        dispatch(act.filterByDiets(e.target.value))
    };

    const handleOrderByName = (e) => {
        dispatch(act.orderByName(e.target.value))
        home ? setHome(false) : setHome(true)
    };

    const handleOrderByScore = (e) => {
        dispatch(act.orderByScore(e.target.value))
        home ? setHome(false) : setHome(true)
    };

    const returnToFirstPage = () => {
        setCurrentPage(1)
    };

    console.log(currentRecipes);

    return (
        !rec ?
        <div>
            Loading...
        </div>
        : rec?.length ?
        <div className={css.home}>
            <div className={css.selectContainer}>
            <SearchBar returnToFirstPage={returnToFirstPage} />
            <Link to="/form"><button className={css.createButton}>Create recipe</button></Link>
                <select onChange={e => handleOrderByName(e)} defaultValue='default' className={css.filters}>
                    <option value="default" disabled >Alphabetical order</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select onChange={e => handleOrderByScore(e)} defaultValue='default' className={css.filters}>
                    <option value="default" disabled >Order by score</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>
                <select onChange={e => handleFilterByDiets(e)} defaultValue='default' className={css.filters}>
                    <option value="default" disabled >Select by diet type</option>
                    {
                        diets && diets.map(d => (
                            <option value={d} key={d}>{d}</option>
                        ))
                    }
                </select>
            </div>
                <div className={css.cardsGrid}>
                    {
                        currentRecipes?.map(el => {
                            return (
                                <Card img={el.image} name={el.name} diet={el.dietTypes} id={el.id} key={el.id} className={css.Card} />
                            )
                        })
                    }
                </div>
                <br />
                <Paginate
                    recipesPerPage={recipesPerPage}
                    recipes={rec?.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
        </div> : null
    )
};

export default HomePage;