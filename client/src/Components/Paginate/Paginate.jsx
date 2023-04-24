import React from "react";
import css from "./Paginate.module.css";

const Paginate = ({recipesPerPage, recipes, paginate, currentPage}) => {

    const totalPages = Math.ceil(recipes / recipesPerPage); 
    const pageNum = Array.from({ length: totalPages }, (_, i) => i + 1) // creamos un arreglo con los números de página que se mostrarán en la paginación

    return (
        <div className={css.center}>
            <ul className={css.pagination}>
                {pageNum.map((num) => (
                    <li key={num}>
                        <button
                            onClick={() => paginate(num)}
                            style={ num === currentPage
                                    ?   {
                                          backgroundColor: "#fd684d",
                                          color: "white",
                                          border: "1px solid #777db8",
                                        }
                                    : {}} > {num}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Paginate;
