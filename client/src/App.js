import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';

function App() {

  const { pathname } =useLocation()
  return (
    
    <div className="App">
      {pathname === "/" && <h1>Henry Food</h1>}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        {/*<Route path="/form" element={<Form/>}/>
        <Route path="/recipes/:id" element={<Detail/>}/>*/}
      </Routes> 
    </div>
  );
}

export default App;
