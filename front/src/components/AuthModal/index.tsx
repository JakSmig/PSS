import CloseIcon from '@mui/icons-material/Close';
import { Card, ClickAwayListener, Grid, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';

import {
  SignInFormVariantContext,
  ToggleSignInFormContext,
} from '../../contexts/SignInFormProvider';
import { SignInVariant } from '../../enums';
import { LoginCard } from './components/LoginCard';
import { SignUp } from './components/SignUpCard';

export const AuthModal = () => {
  const { signInVariant } = useContext(SignInFormVariantContext);
  const { setShow } = useContext(ToggleSignInFormContext);

  const Children = {
    [SignInVariant.SignIn]: LoginCard,
    [SignInVariant.SignUp]: SignUp,
    [SignInVariant.Reset]: () => <></>,
  }[signInVariant];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        '::after': {
          content: '""',
          height: '100vh',
          width: '100%',
          position: 'fixed',
          background: 'rgba(0, 0, 0, 0.86)',
          zIndex: 9998,
        },
      }}
    >
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Card
          sx={{
            backgroundColor: '#EEF2FF',
            width: '410px',
            borderRadius: '8px',
            padding: '15px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
          }}
        >
          <IconButton
            sx={{ marginLeft: 'auto' }}
            aria-label="delete"
            onClick={() => setShow(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Children />
          </Grid>
        </Card>
      </ClickAwayListener>
    </Box>
  );
};
