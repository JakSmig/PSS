import { Layout, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';

import { getAllUsers } from '../../api/user';
import { UserTable } from './components/UserTable';

const date = new Date();
const AdminPage = () => {
  const users = useQuery({
    queryKey: ['allUsers', date.getDay()],
    queryFn: () => getAllUsers(),
    refetchOnWindowFocus: false,
  });

  return (
    <Layout
      style={{
        backgroundColor: '#b2d9a7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Space>{users.data && <UserTable users={users.data} />}</Space>
    </Layout>
  );
};
export { AdminPage };
