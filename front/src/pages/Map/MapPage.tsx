
import { MapContainer, TileLayer } from 'react-leaflet';
import "./MapPage.css"

const MapPage = () => {  
  return(
    <div className='leaflet-control-container'>
          <MapContainer  className="container" center={[17.038,51.107]} zoom={13} scrollWheelZoom={true} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </MapContainer>
            </div>
   
  );
};

export { MapPage };
