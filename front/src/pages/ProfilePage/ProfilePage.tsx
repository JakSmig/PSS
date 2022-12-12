import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import DarkBG from './darkBG.svg';
import LightBG from './lightBG.svg';
import { ProfileInfo } from './subPages/ProfileInfo';
import { UserCapitals } from './subPages/UserCapitals';
import { UserReviews } from './subPages/UserReviews';

const ProfilePage = () => {
  const { theme } = useThemeStore();

  const color = theme === 'light' ? '#fff' : '#452861';
  const [selectedMenuItem, setSelectedMenuItem] = useState('item1');

  const componentsSwitch = (key: string) => {
    switch (key) {
      case 'item1':
        return <ProfileInfo color={color} />;
      case 'item2':
        return <UserCapitals color={color} />;
      case 'item3':
        return <UserReviews color={color} />;
      default:
        break;
    }
  };
  const user = useAuthStore(s => s.user);
  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <Layout
      data-theme={theme}
      style={{
        height: '100%',
        flex: 1,
        display: 'flex',
      }}
    >
      <Layout.Sider
        width={300}
        style={{
          flex: 1,
          height: '100%',
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['item1']}
          defaultOpenKeys={['item1']}
          style={{
            height: '100%',
            flex: 1,
            borderRight: 0,
          }}
          onClick={e => setSelectedMenuItem(e.key)}
        >
          <Menu.Item key="item1">
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="item2">
            <span>Capitals</span>
          </Menu.Item>
          <Menu.Item key="item3">
            <span>Reviews</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content
        style={{
          backgroundImage:
            theme === 'light' ? `url(${LightBG})` : `url(${DarkBG})`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        {componentsSwitch(selectedMenuItem)}
      </Layout.Content>
    </Layout>
  );
};

export { ProfilePage };
