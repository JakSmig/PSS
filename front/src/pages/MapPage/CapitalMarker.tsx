import { Typography } from 'antd';
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  lat: number;
  lon: number;
};

const CapitalMarker = ({ name, lat, lon }: Props) => {
 
  return (
    <>
      <Link to={`/capital/${name}`}>
        <Marker position={[lat, lon]} opacity={0}>
          <Tooltip opacity={1} interactive permanent direction="top">
            <Typography.Title level={4}>{name}</Typography.Title>
          </Tooltip>
        </Marker>
      </Link>
    </>
  );
};
export { CapitalMarker };
