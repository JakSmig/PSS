import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PropsWithChildren } from "react";
import Background from "../../asserts/images/bgimage.png";
import { AutocompleteInput } from "../../components/AutocompleteInput";
import { CarouselCard } from "../../components/CarouselCard";
import { LoginCard } from "../../components/AuthCard/LoginCard";

const HomePage = ({
  loginForm,
  setForm,
  children,
}: { loginForm: boolean } & { setForm: any } & PropsWithChildren) => {
  return (
    <Grid container
    direction="column"
    alignItems="center"
    sx={{
      height: "300vh",
      backgroundColor: "#052438"}}>
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
     
      <Box
        sx={{
          maxWidth: "900px",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "#FFEEEF" , mt: "200px"}}>
          <Typography variant="h3" sx={{ fontSize: "60px", fontWeight: "700" }}>
            All word in one place
          </Typography>

          <Typography component="p" sx={{ fontSize: "20px" }}>
            Check out reviews, weather and all basic usefull information about
            the country you are going to. Share your tips and experience that
            might come in handy for other people.
          </Typography>
        </Box>
        <Box sx={{display :"flex", alignItems: "center",}}>
        <AutocompleteInput handleSelect={() => {}}></AutocompleteInput>
        <Button variant="contained" color="primary" sx={{height: "38px", marginLeft: "5px"}}>Search</Button>
        </Box>
      </Box>
    
      {loginForm && <LoginCard setForm={setForm} />}
    </Grid>
    <Grid container alignItems="center" justifyContent="center" sx={{width: "100%", height: "100vh"}}>
        <CarouselCard/>
      </Grid>
    </Grid>

  );
};
export { HomePage };
