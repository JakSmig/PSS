import { Outlet } from "react-router-dom";
import "./App.less";
import { Navbar } from "./components/Navbar/Navbar";
import { useStore } from "./hooks/useStore";
import {useEffect} from 'react'

function App() {
  const setToken = useStore(state => state.setToken);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (setToken(token));
    }
  }, [setToken]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
