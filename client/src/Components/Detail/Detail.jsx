import { useDispatch, useSelector } from "react-redux";
import * as act from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import css from "./Detail.module.css";

const Detail = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeDetail = useSelector(state => state.recipeDetail.recipe); //! CUANDO LLAMAS POR DATA STATE.RECIPEDETAIL SINO RECIPEDETAIL.RECIPE
  
  useEffect(() => {
    dispatch(act.getDetail(id))
    return () => {
      dispatch(act.clearDetail())
    }
  }, [id])
  
  // console.log(recipeDetail);

  const handleBack = () => {
    navigate("/home")
  }

  return (
    <div className={css.detail}>
      {!recipeDetail ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <button className={css.back} onClick={() => handleBack()}>Back</button>
          <h2>Id: {recipeDetail.id}</h2>
          <h3 className={css.title}>titulo: {recipeDetail.name}</h3>
          <img src={recipeDetail.image} alt="img" />
          <h3 className={css.summary} dangerouslySetInnerHTML={{__html: recipeDetail.summary}}></h3>
          <h3>Puntos de salud: {recipeDetail.healthScore}</h3>
          <h3>Tipo de dieta: {recipeDetail.dietTypes.join(", ")}</h3>
          <h3>tipos de platos: {recipeDetail.dishTypes.join(", ")}</h3> 
          {recipeDetail.steps ? <p className={css.steps} dangerouslySetInnerHTML={{__html: `Steps: ${recipeDetail.steps.map((step, index) => (`<span key="${index}" className="${css.step}">${index + 1}. ${step}<br /></span>`)).join('')}`}} /> : null}
        </>
      )}
    </div>
  );
};

export default Detail;