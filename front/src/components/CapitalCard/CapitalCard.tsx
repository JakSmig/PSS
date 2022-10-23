import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { Capital } from '../../models/Capital';
import './CapitalCard.css';

const CapitalCard = ({ name, image }: Capital) => {
  return (
    <Link to={`/capital/${name}`}>
      <Box
        className="card"
        sx={{
          height: '450px',
          width: '300px',
          backgroundImage: `url(${image})`,
          borderRadius: '30px',
          position: 'relative',
          backgroundSize: 'cover',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            fontSize: '30px',
            padding: '10px',
            borderBottomLeftRadius: '30px',
            borderTopRightRadius: '30px',
          }}
        >
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

export { CapitalCard };
