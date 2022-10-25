import { Typography } from '@material-ui/core';
import { icon } from 'leaflet';
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { Link } from 'react-router-dom';

import marker from '../../assets/images/marker.png';
type Props = {
  name: string;
  lat: number;
  lon: number;
};

const CapitalMarker = ({ name, lat, lon }: Props) => {
  const Icon = icon({
    iconUrl: marker,
    iconSize: [40, 40],
  });
  return (
    <>
      <Link to={`/capital/${name}`}>
        <Marker icon={Icon} position={[lat, lon]} opacity={0}>
          <Tooltip opacity={1} interactive permanent direction="top">
            <Typography variant="h6">{name}</Typography>
          </Tooltip>
        </Marker>
      </Link>
    </>
  );
};
export { CapitalMarker };
