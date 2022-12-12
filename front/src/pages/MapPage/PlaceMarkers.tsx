import { LoadingOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Map } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useQuery } from 'react-query';

import { getCapitalsInBounds } from '../../api/capital';
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

  const capitals = useQuery({
    queryKey: ['mapBounds', mapData.boundsCoordinates],
    queryFn: getCapitalsInBounds,
  });

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
  const [sLat, sLng, nLat, nLng] = mapData.boundsCoordinates
    .substring(1, mapData.boundsCoordinates.length - 1)
    .split(',')
    .map(Number);
  const filteredCapitals = capitals.data?.filter(e => {
    const [lat, lng] = e.coordenates
      .substring(1, e.coordenates.length - 1)
      .split(',')
      .map(Number);
    return lat > sLat && lat < nLat && lng < nLng && lng > sLng;
  });
  return (
    <>
      {capitals.isLoading ? (
        <Space
          style={{
            height: '100vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: '9999',
          }}
        >
          <LoadingOutlined style={{ fontSize: '50px' }} />
        </Space>
      ) : (
        filteredCapitals?.map(capital => {
          const [lat, lng] = capital.coordenates
            .substring(1, capital.coordenates.length - 1)
            .split(',')
            .map(Number);
          return (
            <CapitalMarker
              key={capital.id}
              name={capital.name}
              lat={lat}
              lon={lng}
              zoom={mapData.zoom}
            />
          );
        })
      )}
    </>
  );
};

export { PlaceMarkers };
