import css from "./card.module.css";
import { Link } from "react-router-dom";


const Recipes = ({name, img, diet, id }) => {

    return (
        <div className={css.cardContainer}>
            <div className={`${css.card} ${css.uClearfix}`}>
                <div className={css.cardBody}>
                    <h2 className={css.cardTitle}>{name}</h2>
                    <ul className={`${css.cardDescription} ${css.subtle}`}>{diet.map(d => <li key={d.name}>{d.name}</li>)}</ul>
                    <div >
                        <Link to={`/recipe/:${id}`} className={css.cardRead}>
                        See recipe details</Link>
                    </div>
                </div>
                <img src={img} alt="not found" width="300px" height="300px" className={css.cardMedia} />
            </div>
            <div className={css.cardShadow}></div>
        </div>
    )
}
export default Recipes;