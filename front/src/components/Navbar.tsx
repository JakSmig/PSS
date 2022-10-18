import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from "../asserts/images/logo.png";
import { Button } from "@mui/material";

type Props = {
  setForm: any;
};

const Navbar = ({ setForm }: Props) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <img
            src={Logo}
            alt="logo"
            style={{ height: "50px", width: "50px", margin: "10px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fajna nazwa
          </Typography>
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setForm((f: boolean) => !f)}
                color="inherit"
              >
                <Typography variant="h6" sx={{marginRight: "10px"}}>Log In</Typography>
                <AccountCircle sx={{ height: "50px", width: "50px" }} />
              </Button>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Navbar };
