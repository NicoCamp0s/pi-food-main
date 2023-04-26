import css from "./LP.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
    
    return (
        <div className={css.LandingPage}>
            <h1>Henry Food</h1>
            <h1>WELCOME!!</h1>
            <Link to="/home"><button>Get into</button></Link>
        </div>
    )
}

export default LandingPage;