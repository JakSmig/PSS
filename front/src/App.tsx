import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import { AuthModal } from './components/AuthModal';
import { Navbar } from './components/Navbar/Navbar';
import { ToggleSignInFormContext } from './contexts/SignInFormProvider';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { show } = useContext(ToggleSignInFormContext);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar />
      <Outlet />
      {show && <AuthModal />}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
