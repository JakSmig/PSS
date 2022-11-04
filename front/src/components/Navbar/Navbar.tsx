import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { NavLink, useLocation, Location } from 'react-router-dom';

import './Navbar.css';

import Logo from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/AuthProvider';
import { ToggleSignInFormContext } from '../../contexts/SignInFormProvider';
import { Paths } from '../../enums';
import { AccountMenu } from './AccountMenu';

const Navbar = () => {
  const { setShow } = useContext(ToggleSignInFormContext);
  const { token } = useContext(AuthContext);
  const location: Location = useLocation();

  const isWithShadow = location.pathname === Paths.Map;

  return (
    <AppBar
      position="absolute"
      style={{
        background: isWithShadow ? 'rgba(0,0,0,0.4)' : 'transparent',
        boxShadow: 'none',
      }}
    >
      <Grid container justifyContent="space-between">
        <NavLink to={Paths.Home} className="nav-link">
          <Grid display="flex" item alignItems="center">
            <img
              src={Logo}
              alt="logo"
              style={{ height: '50px', width: '50px', margin: '10px' }}
            />
            <Typography variant="h6" textTransform="uppercase">
              Nazwa
            </Typography>
          </Grid>
        </NavLink>
        <Grid display="flex" item alignItems="center">
          <NavLink
            to={Paths.Home}
            end
            className="nav-link"
            style={({ isActive }) => ({
              borderBottom: isActive ? '2px solid white' : 'none',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to={Paths.Map}
            className="nav-link"
            style={({ isActive }) => ({
              borderBottom: isActive ? '2px solid white' : 'none',
            })}
          >
            Map
          </NavLink>
          {token ? (
            <AccountMenu />
          ) : (
            <Button
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setShow(f => !f)}
              color="inherit"
            >
              <Typography
                component="div"
                sx={{
                  marginRight: '10px',
                  fontSize: '24px',
                  display: 'inline-block',
                }}
              >
                Log In
              </Typography>

              <AccountCircle sx={{ height: '50px', width: '50px' }} />
            </Button>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
};

export { Navbar };
