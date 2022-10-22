import { Grid } from "@mui/material"
import { CapitalInfo } from "../../components/CapitalInfo"
import France from "../../asserts/images/france.png"

const CapitalPage = () => {
  return(
<Grid container sx={{height: "100vh", width: "100%", backgroundColor: "#2d429c"}}>
  <CapitalInfo name="Paris" country="France" flagImage={France}/>
</Grid>
  )
}

export {CapitalPage}