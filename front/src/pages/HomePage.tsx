import {  Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import Background from "../asserts/images/bgimage.png";
import { LoginCard } from "../components/LoginCard";

const HomePage = ({ loginForm, setForm , children }: { loginForm: boolean } & {setForm : any} & PropsWithChildren) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${Background})`,
        minWidth: "100%",
        height: "100vh",
      }}
    >
      {children}
      {loginForm && <LoginCard setForm={setForm} />}
    </Grid>
  );
};
export { HomePage };
