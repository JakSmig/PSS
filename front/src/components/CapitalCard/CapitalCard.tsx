import { Box, Typography } from "@mui/material";
import Amster from "../../asserts/images/amster.jpg";
import "./CapitalCard.css"

const CapitalCard = () => {

  return (
    <Box className="card"
      sx={{
        height: "450px",
        width: "300px",
        backgroundImage: `url(${Amster})`,
        borderRadius: "30px",
        position: "relative"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#fff",
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          fontSize : "30px",
          padding: "10px",
          borderBottomLeftRadius: "30px",
          borderTopRightRadius: "30px",
        }}
      >
        Amsterdam
      </Typography>
    </Box>
  );
};

export { CapitalCard };
