import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { useState } from "react";
import { AuthCard } from "./AuthCard";
import { SignUp } from "./SignUpCard";

const LoginCard = ({ setForm }: any) => {
  const [signup, setSignup] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderContent = () => {
    if (signup) {
      return <SignUp handleSignIn={setSignup} setForm={setForm} />;
    } else {
      return (
        <AuthCard close={() => setForm((f: boolean) => !f)}>
          <form onSubmit={formik.handleSubmit} style={{ margin: "auto 40px" }}>
            <Typography
              variant="h6"
              fontWeight="700"
              fontSize="35px"
              sx={{ my: 1 }}
              align="center"
            >
              Log in
            </Typography>
            <Typography component="p" align="left">
              Your login
            </Typography>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              sx={{ width: "100%", my: 2 }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Typography component="p">Your password</Typography>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              margin="normal"
              sx={{ width: "100%" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", my: 3 }}
              >
                Log in
              </Button>
            </Box>
          </form>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton aria-label="google" color="primary" size="large">
              <GoogleIcon />
            </IconButton>
            <IconButton aria-label="facebook" color="primary" size="large">
              <FacebookRoundedIcon />
            </IconButton>
          </Grid>
          <Button variant="text">Forgot your password?</Button>
          <Typography>
            <Button
              onClick={() => {
                setSignup(true);
                console.log(signup);
              }}
            >
              Sign up
            </Button>
            if you dont't have an account yet
          </Typography>
        </AuthCard>
      );
    }
  };
  return <>{renderContent()}</>;
};

export { LoginCard };
