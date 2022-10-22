import { Card, Grid, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { PropsWithChildren } from "react";

const AuthCard = ({close,children}: any & PropsWithChildren) => {
  return (
    <Card
      sx={{
        backgroundColor: "#EEF2FF",
        width: "410px",
        borderRadius: "25px",
        position: "absolute",
        marginTop: "100px"
      }}
    >
      <IconButton
        aria-label="delete"
        onClick={() => close()}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Grid>
    </Card>
  );
};
export { AuthCard };
