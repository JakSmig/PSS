import 'leaflet/dist/leaflet.css';
import './MapPage.css';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { PlaceMarkers } from './PlaceMarkers';
const initialZoom = 10;

const MapPage = () => {
  const coordinates: [number, number] = [52.237049, 21.017532];

  return (
    <div className="leaflet-control-container">
      <MapContainer
        className="container"
        center={coordinates}
        zoom={initialZoom}
        zoomControl={false}
        minZoom={3}
        maxZoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PlaceMarkers zoom={initialZoom} center={coordinates} />
      </MapContainer>
    </div>
  );
};

export { MapPage };
