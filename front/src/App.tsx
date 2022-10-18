import "./App.css";
import { HomePage } from "./pages/HomePage";
import './asserts/styles/index.css';
import { Navbar } from "./components/Navbar";
import { useState } from "react";

function App() {
  
  const [loginForm, setLoginForm] = useState<boolean>(false);
  return (
    <>
      <Navbar setForm={setLoginForm}/>
      <HomePage loginForm={loginForm}  setForm={setLoginForm}/>
    </>
  );
}

export default App;
