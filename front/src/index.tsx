import './index.less';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { Paths } from './lib/enums';
import { AdminPage } from './pages/AdminPanel/AdminPage';
import { CapitalPage } from './pages/CapitalPage/CapitalPage';
import { HomePage } from './pages/HomePage/HomePage';
import { MapPage } from './pages/MapPage/MapPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import reportWebVitals from './reportWebVitals';

export const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={Paths.Map} element={<MapPage />} />
            <Route path={Paths.Capital} element={<CapitalPage />} />
            <Route path={Paths.Profile} element={<ProfilePage />} />
            <Route path={Paths.Admin} element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
