import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/Home/HomePage";
import './asserts/styles/index.css';
import { Navbar } from "./components/Navbar";
import { useState } from "react";
import { Paths } from "./enums/Path";
import { MapPage } from "./pages/Map/MapPage";
import { CapitalPage } from "./pages/Capital/CapitalPage";

function App() {
  
  const [loginForm, setLoginForm] = useState<boolean>(false);
  return (
    <>
      <Navbar setForm={setLoginForm}/>
      <Routes>
      <Route path={Paths.Home} element={ <HomePage loginForm={loginForm}  setForm={setLoginForm}/>} />
      <Route path={Paths.Map} element={ <MapPage/>} />
      <Route path={Paths.Capital} element={ <CapitalPage/>} />
      
      </Routes>
    </>
  );
}

export default App;
