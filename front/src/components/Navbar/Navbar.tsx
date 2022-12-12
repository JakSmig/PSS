import './Navbar.less';

import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  Switch,
  Typography,
} from 'antd';
import React, { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../../api/user';
import Day from '../../assets/images/day.png';
import Logo from '../../assets/images/logo.png';
import Night from '../../assets/images/night.png';
import { Paths } from '../../lib/enums';
import { openNotification } from '../../lib/notifications';
import { useAuthStore } from '../../store/authStore';
import { useModalStore } from '../../store/modalStore';
import { useThemeStore } from '../../store/themeStore';
import { ModalCard } from '../AuthModal/AuthModal';

const Navbar = () => {
  const { pathname } = useLocation();
  const { token, user, setToken } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { isModalOpen, setModal } = useModalStore();
  const navigate = useNavigate();

  const getNavbarColorByPathname = useCallback(
    (pathname: string) => {
      const navbarColors = {
        [Paths.Map]: 'rgba(138, 138, 138, 0.5)',
        [Paths.Admin]: '#1DA57A',
        [Paths.Profile]: theme === 'light' ? '#1DA57A' : '#2e1b40',
        '/capital': theme === 'light' ? '#1DA57A' : '#2e1b40',
      } as { [k: string]: string };

      for (const key of Object.keys(navbarColors)) {
        if (pathname.includes(key)) {
          return navbarColors[key];
        }
      }

      return 'transparent';
    },
    [theme],
  );

  const items: MenuProps['items'] =
    user?.role === 'ADMIN'
      ? [
          {
            label: <NavLink to={Paths.Profile}>My profile</NavLink>,
            key: '0',
          },
          {
            label: <NavLink to={Paths.Admin}>Users menagment</NavLink>,
            key: '1',
          },
          {
            label: (
              <Button
                onClick={() => {
                  setToken('');
                  token && logout(token);
                  openNotification('You were succesfully loged out!');
                  navigate('/');
                }}
              >
                Log out
              </Button>
            ),
            key: '2',
          },
        ]
      : [
          {
            label: <NavLink to={Paths.Profile}>My profile</NavLink>,
            key: '0',
          },
          {
            label: (
              <Button
                onClick={() => {
                  setToken('');
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  logout(token as string);
                  openNotification('You were succesfully loged out!');
                  navigate('/');
                }}
              >
                Log out
              </Button>
            ),
            key: '1',
          },
        ];

  return (
    <Layout.Header
      data-theme={theme}
      style={{
        backgroundColor: getNavbarColorByPathname(pathname),
        borderBottom: '1px solid #fff',
        position: 'sticky',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 2,
        alignItems: 'center',
      }}
    >
      {isModalOpen && <ModalCard />}
      <Space
        style={{
          justifyContent: 'space-between',
          width: '1200px',
        }}
      >
        <NavLink to={Paths.Home} end className="nav-link">
          <img src={Logo} alt="capitals" height={40} />
        </NavLink>
        <Space>
          <NavLink
            to={Paths.Home}
            end
            className="nav-link"
            data-theme={theme}
            style={({ isActive }) => ({
              borderBottom: isActive
                ? theme === 'light'
                  ? '2px solid #1DA57A'
                  : '2px solid #DA627D'
                : 'none',
              color: isActive
                ? theme === 'light'
                  ? '#1DA57A'
                  : '#DA627D'
                : '#fff',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to={Paths.Map}
            className="nav-link"
            style={({ isActive }) => ({
              borderBottom: isActive
                ? theme === 'light'
                  ? '2px solid #1DA57A'
                  : '2px solid #DA627D'
                : 'none',
              color: isActive
                ? theme === 'light'
                  ? '#1DA57A'
                  : '#DA627D'
                : '#fff',
            })}
          >
            Map
          </NavLink>
          {token ? (
            <Dropdown menu={{ items }} trigger={['click']}>
              {user?.avatar ? (
                <Avatar size={40} src={user?.avatar.value} />
              ) : (
                <Avatar size={40} icon={<UserOutlined />} />
              )}
            </Dropdown>
          ) : (
            <Typography.Text
              className="login-button"
              onClick={() => setModal(true)}
            >
              LOG IN
            </Typography.Text>
          )}
          <Switch
            checkedChildren={<img src={Day} alt="day" height="15px" />}
            unCheckedChildren={<img src={Night} alt="night" height="15px" />}
            defaultChecked
            onClick={() => toggleTheme()}
          />
        </Space>
      </Space>
    </Layout.Header>
  );
};
export { Navbar };
