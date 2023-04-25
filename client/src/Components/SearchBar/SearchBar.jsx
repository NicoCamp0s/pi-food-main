import React, {useState} from "react";
import { useDispatch } from "react-redux";
import * as act from "../../redux/actions";
import css from "./searchBar.module.css";

const SearchBar = (returnToFirstPage) => {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(e.target.value);
    };
    
    function handleButton(e){
        e.preventDefault();
        dispatch(act.searchByName(name))
        .then(() =>{ returnToFirstPage(); })        
    };

    return (
        <div className={css.searchContainer}>
            <input className={css.searchInput} type="text" placeholder='Search by name or diet type:' onChange={(e) => handleChange(e)}/>
            <button className={css.buttonSearch} type='submit' onClick={ (e) => handleButton(e)}>Search</button>
        </div>
    )
}

export default SearchBar;