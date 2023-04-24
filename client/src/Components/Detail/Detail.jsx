import { useDispatch, useSelector } from "react-redux";
import * as act from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import css from "./Detail.module.css";

const Detail = () => {

    const dispatch = useDispatch()
    const { id } = useParams();
    const recipeDetail = useSelector(state => state.recipeDetail.recipe);
    
    console.log(recipeDetail);
    useEffect(() => {
      dispatch(act.getDetail(id))
      return () => {
        dispatch(act.clearDetail())
      }
    }, [id])
    
    return (
      <div className={css.detail}>
        {!recipeDetail ? (
          <h3>Loading...</h3>
        ) : (
          <>

            <h2>Id: {recipeDetail.id}</h2>
            <h3 className={css.title}>titulo: {recipeDetail.name}</h3>
            <img src={recipeDetail.image} alt="img" />
            <h3 dangerouslySetInnerHTML={{__html: recipeDetail.summary}}></h3>
            <h3>Puntos de salud: {recipeDetail.healthScore}</h3>
            <h3>Tipo de dieta: {recipeDetail.dietTypes.join(", ")}</h3>
            <h3>tipos de platos: {recipeDetail.dishTypes.join(", ")}</h3> 
            <h3></h3>
            {/* <p className={css.steps}> Pasos: {recipeDetail.steps.map((step, index) => (
              <span key={index} className={css.step}>
                {index + 1}. {step}
                <br />
              </span>
            ))}
          </p> */}
            <p className={css.steps} dangerouslySetInnerHTML={{__html: `Pasos: ${recipeDetail.steps.map((step, index) => (`<span key=${index} className=${css.step}>${index + 1}. ${step}<br /></span>`)).join('')}`}} />
          </>
        )}
      </div>
    );
  };

export default Detail;