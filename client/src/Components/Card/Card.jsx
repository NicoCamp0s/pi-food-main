import css from "./card.module.css";
import { Link } from "react-router-dom";


const Card = (props) => {

    const { name, img, diet, id } = props;
    // console.log(diet);
    // console.log(props);
    // console.log(name);
    return (
        <div className={css.cardContainer}>
            <div className={`${css.card} ${css.uClearfix}`}>
                <div className={css.cardBody}>
                    <h2 className={css.cardTitle}>{name}</h2>
                    { <ul className={`${css.cardDescription} ${css.subtle}`}>{diet.map(d => <li key={d}>{d}</li>)}</ul> }
                    <div>
                        <Link to={`/recipes/${id}`} className={css.cardRead}>See recipe details</Link>
                    </div>
                </div>
                <img src={img} alt="not found" width="300px" height="300px" className={css.cardMedia} />
            </div>
            <div className={css.cardShadow}></div>
        </div>
    )
}
export default Card;