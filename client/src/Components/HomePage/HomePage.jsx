// import css from "./HP.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    
    
    return (
        <div>
            <h1>Este es el homePage</h1>
            <Link to="/form"><button>Crear receta</button></Link>
            
        </div>
    )
}

export default HomePage;