import css from "./form.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as act from "../../redux/actions";
import { validate } from "../../Helpers/Validation";

const Forms = () => {
    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    console.log(diets);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(act.getDiets())
    }, [dispatch])

    const [rec, setRec] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        image: '',
        steps: [],
        diets: []
    })
    function handleInputChange(e) {
        setRec({
            ...rec,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...rec,
            [e.target.name]: e.target.value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) alert("Please fill in all fields")
        else {
            dispatch(act.createrRecipe(rec))
            alert("Recipe created successfully!")
        }
    };

    function handleSelectDiets(e) {
        if (!rec.diets.includes(e.target.value))
            setRec({
                ...rec,
                diets: [...rec.diets, e.target.value]
            });
        setErrors(validate({
            ...rec,
            diets: [...rec.diets, e.target.value]
        }));
    };

    function handleSteps(e) {
        setRec({
            ...rec,
            steps: [e.target.value]
        });
        setErrors(validate({
            ...rec,
            steps: e.target.value
        }));
    }

    function handleDietDelete(diet) {
        setRec({
            ...rec,
            diets: rec.diets.filter(elemet => elemet !== diet)
        })
        setErrors(validate({
            ...rec,
            diets: [...rec.diets]
        }));

    };

    return (
        <div className={css.container}>
            <div className={css.bkg} />
            <div className={css.bkgcolor}>
                <div className={css.form}>
                    <h1>Creacion de receta</h1>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            <label>Name</label>
                            <input type="text" value={rec.name} name='name' onChange={e => handleInputChange(e)} />
                            {errors.name && (
                                <p>{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label>Summary</label>
                            <textarea value={rec.summary} name='summary' onChange={e => handleInputChange(e)} />
                            {errors.summary && (
                                <p>{errors.summary}</p>
                            )}
                        </div>
                        <div>
                            <label>health Score</label>
                            <input type="number" min="0" max='100' value={rec.healthScore} name='healthScore' onChange={e => handleInputChange(e)} />
                            {errors.healthScore && (
                                <p>{errors.healthScore}</p>
                            )}
                        </div>
                        <div>
                            <label>Image</label>
                            <input type="text" value={rec.image} name='image' onChange={e => handleInputChange(e)} />
                            {errors.image && (
                                <p>{errors.image}</p>
                            )}
                        </div>
                        <div>
                            <label>Steps</label>
                            <textarea value={rec.steps} name='steps' onChange={e => handleSteps(e)} />
                            {errors.steps && (
                                <p>{errors.steps}</p>
                            )}
                        </div>
                        <div>
                            <select onChange={e => handleSelectDiets(e)} defaultValue='default'
                            className={css.dietSelect}>
                                <option value="default" disabled className={css.dietOption}>Select type of diet</option>
                                {
                                    diets && diets.map(d => (
                                        <option value={d} key={d} className={css.dietOption}>{d}</option>
                                    ))
                                }
                            </select>
                            {errors.diets && (
                                <p style={{ float: 'right' }}>{errors.diets}</p>
                            )}
                            {rec.diets.map(d =>
                                <div key={d} className={css.divdiets}>
                                    <p className={css.selecteddiets}>{d}</p>
                                    <button onClick={() => handleDietDelete(d)}
                                    className={css.buttonclose}>X</button>
                                </div>
                            )}
                        </div>
                        <button type='submit' className={css.createButton}>Create</button>
                    </form>
                    <Link to='/home'>
                        <button className={css.createButton}>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Forms;