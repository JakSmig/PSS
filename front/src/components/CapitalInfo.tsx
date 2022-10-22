import { Avatar, Container, Divider, Grid, Typography } from '@mui/material';


type Props ={
  name: string,
  country: string,
  flagImage: string,
}
const CapitalInfo = ({name, country, flagImage}:Props) => {
  return(
    <Container sx={{width: "20%"}}>
      <Grid container justifyContent="space-between" alignItems="center">
      <Typography color="#fff" fontSize={42} fontWeight={500} sx={{marginRight: "20px"}}>{name}</Typography>
      <Avatar 
        alt={name}
        src={flagImage}
      />
      </Grid>
      <Divider  sx={{ borderBottomWidth: 2 , borderColor: "#fff" }}/>
      <Typography color="#fff" fontSize={20} fontWeight={300}>{country}</Typography>
    </Container>
  )
}

export {CapitalInfo}