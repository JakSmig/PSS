import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
const SignUp = ({ setForm , handleSignIn}: any) => {
  const validationSchema = yup.object({
    fullname:yup
      .string()
      .min(5,"Fullname should be of min 5 characters length")
      .required("Fullname is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confpassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Card
      sx={{
        backgroundColor: "#EEF2FF",
        width: "410px",
        borderRadius: "25px",
      }}
    >
      <IconButton aria-label="delete" onClick={() => setForm((f: boolean) => !f)}>
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={formik.handleSubmit} style={{margin : "auto 40px"}}>
          <Typography variant="h6" fontWeight="700" fontSize="35px" sx={{ marginBottom: 1 }} align="center">
            Sign up
          </Typography>
          <Typography component="p" align="left">
            Your fullname
          </Typography>
          <TextField
            id="fullname"
            label="fullname"
            variant="outlined"
            sx={{width: "100%"}}
            value={formik.values.fullname}
            onChange={formik.handleChange}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
          <Typography component="p" align="left">
            Your email
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{width: "100%"}}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Typography component="p">Create your password</Typography>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            margin="normal"
            sx={{width: "100%"}}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
            <Typography component="p">Confirm your password</Typography>
          <TextField
            id="confpassword"
            label="Password"
            variant="outlined"
            margin="normal"
            sx={{width: "100%"}}
            value={formik.values.confpassword}
            onChange={formik.handleChange}
            error={formik.touched.confpassword && Boolean(formik.errors.confpassword)}
            helperText={formik.touched.confpassword && formik.errors.confpassword}
          />
          <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ width: "100%", my: 2 }}>
            Sign up
          </Button>
          </Box>
        </form>
        <Typography component="p">Sign up with :</Typography>
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
        <Button variant="text" onClick={()=>handleSignIn((f: boolean) => !f)}>I already have an account</Button>
      </Grid>
    </Card>
  );
};

export { SignUp };
