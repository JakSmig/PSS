import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { useCurrentUser } from './hooks/useCurrentUser';

function App() {
  useCurrentUser();

  return (
    <Layout style={{ height: '100%', display: 'flex' }}>
      <Navbar />
      <Outlet />
    </Layout>
  );
}

export default App;
