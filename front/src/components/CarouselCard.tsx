import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { CapitalCard } from "./CapitalCard/CapitalCard";

const CarouselCard = () => {
  const items = [1, 2, 3, 4, 5];
  return (
    <Carousel
      navButtonsAlwaysVisible={true}
      animation="slide"
      duration={2000}
      autoPlay={false}
      indicators={false}
      sx={{ minWidth: "100%", minHeight: "500px" }}
    >
      {items.map((item, id) => (
        <Grid
          key={id}
          container
          justifyContent="space-around"
          alignItems="center"
          sx={{ minWidth: "100%", minHeight: "550px" }}
        >
          <CapitalCard key={item} />
          <CapitalCard key={item} />
          <CapitalCard key={item} />
          <CapitalCard key={item} />
        </Grid>
      ))}
    </Carousel>
  );
};
export { CarouselCard };
