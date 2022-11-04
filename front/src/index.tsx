import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import {
  SignInFormVariantProvider,
  ToggleSignInFormProvider,
} from './contexts/SignInFormProvider';
import { Paths } from './enums';
import { CapitalPage } from './pages/Capital/CapitalPage';
import { HomePage } from './pages/Home/HomePage';
import { MapPage } from './pages/Map/MapPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToggleSignInFormProvider>
          <SignInFormVariantProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<HomePage />} />
                  <Route path={Paths.Map} element={<MapPage />} />
                  <Route path={Paths.Capital} element={<CapitalPage />} />
                  <Route path={Paths.Profile} element={<ProfilePage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </SignInFormVariantProvider>
        </ToggleSignInFormProvider>
      </BrowserRouter>
    </QueryClientProvider>
    ,
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
  .then(() => null)
  .catch(() => null);
