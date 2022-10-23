import { Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { CapitalInfo } from '../../components/CapitalInfo';
import { capitals } from '../../mocks/mockCapitals';
import { Capital } from '../../models/Capital';

type Params = {
  capital: string;
};

const CapitalPage = () => {
  const { capital } = useParams() as Params;
  const city = capitals.find(e => e.name === capital) as Capital;
  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100%', backgroundColor: '#2d429c' }}
    >
      <CapitalInfo
        name={city.name}
        country={city.country}
        flagImage={city.image}
      />
    </Grid>
  );
};

export { CapitalPage };
