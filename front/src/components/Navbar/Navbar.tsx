import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

import Logo from '../../assets/images/logo.png';
import { ToggleSignInFormContext } from '../../contexts/SignInFormProvider';
import { Paths } from '../../enums';

const Navbar = () => {
  const { setShow } = useContext(ToggleSignInFormContext);

  return (
    <AppBar
      position="absolute"
      style={{ background: 'transparent', boxShadow: 'none' }}
    >
      <Grid container justifyContent="space-between">
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
        <Grid display="flex" item alignItems="center">
          <NavLink to={Paths.Map} className="nav-link">
            Map
          </NavLink>
          <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setShow(f => !f)}
            color="inherit"
          >
            <Typography
              component="p"
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
        </Grid>
      </Grid>
    </AppBar>
  );
};

export { Navbar };
