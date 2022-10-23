import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { AuthModal } from './components/AuthModal';
import { Navbar } from './components/Navbar/Navbar';
import { ToggleSignInFormContext } from './contexts/SignInFormProvider';
import { Paths } from './enums';
import { CapitalPage } from './pages/Capital/CapitalPage';
import { HomePage } from './pages/Home/HomePage';
import { MapPage } from './pages/Map/MapPage';

function App() {
  const { show } = useContext(ToggleSignInFormContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={Paths.Home} element={<HomePage />} />
        <Route path={Paths.Map} element={<MapPage />} />
        <Route path={Paths.Capital} element={<CapitalPage />} />
      </Routes>
      {show && <AuthModal />}
    </>
  );
}

export default App;
