import { Grid } from '@mui/material';
import React from 'react';

import { capitals } from '../../mocks/mockCapitals';
import { CapitalCard } from '../CapitalCard/CapitalCard';

const CardList = () => {
  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      sx={{ minWidth: '100%', minHeight: '550px' }}
    >
      {capitals.map((item, id) => (
        <CapitalCard
          name={item.name}
          image={item.image}
          key={id}
          country={item.country}
        />
      ))}
    </Grid>
  );
};

export { CardList };
