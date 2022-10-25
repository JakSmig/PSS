import { CircularProgress, Grid } from '@mui/material';
import { Map } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { useCapitals } from '../../api/Overpass';
import { CapitalMarker } from './CapitalMarker';

interface Props {
  boundsCoordinates: string;
  zoom: number;
  center: [number, number];
}

const PlaceMarkers = ({ zoom, center }: Omit<Props, 'boundsCoordinates'>) => {
  const [currentCenter] = useState<[number, number]>(center);
  const [mapData, setMapData] = useState<Omit<Props, 'center'>>({
    boundsCoordinates: '',
    zoom,
  });

  const { data, isLoading } = useCapitals(
    mapData.boundsCoordinates,
    mapData.zoom,
  );

  const setMapPositionDebounce = (map: Map) => {
    const mapBound = map.getBounds();

    const southWest = mapBound.getSouthWest();
    const northEast = mapBound.getNorthEast();

    const zoom = map.getZoom();
    const boundsCoordinates = `(${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng})`;

    setMapData({
      boundsCoordinates,
      zoom,
    });
  };

  const mapp = useMapEvents({
    zoomend: () => setMapPositionDebounce(mapp),
    dragend: () => setMapPositionDebounce(mapp),
  });

  useEffect(() => {
    mapp.setView(currentCenter);

    setMapPositionDebounce(mapp);
  }, [currentCenter, mapp]);

  return (
    <>
      {isLoading ? (
        <Grid
          container
          height="100vh"
          width="100%"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          zIndex={9999}
        >
          <CircularProgress />
        </Grid>
      ) : (
        data?.map(capital => (
          <CapitalMarker
            key={capital.id}
            name={capital.tags['name:en']}
            lat={capital.lat}
            lon={capital.lon}
          />
        ))
      )}
    </>
  );
};

export { PlaceMarkers };
