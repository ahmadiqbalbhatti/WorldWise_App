import styles from "./Map.module.css";
import {useNavigate} from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";
import {useCities} from "../contexts/CitiesContext.jsx";
import {
  useEffect,
  useState
} from "react";
import {useGeolocation} from "../hooks/useGeoLocation.js";
import Button from "./Button.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";


function Map() {
  const {cities}         = useCities();
  const [mapLat, mapLng] = useUrlPosition();

  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const {
          isLoading: isLoadingPosition,
          position : geoLocationPosition,
          getPosition
        }                             = useGeolocation();


  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  function handleMyPosition() {
    getPosition();
    if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && <Button type={"position"}
                                       onClick={handleMyPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>}
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}
                    className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map(city => (
          <Marker position={[city.position.lat, city.position.lng]}
                  key={city.id}>
            <Popup>
              <span>{city.emoji}</span><span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition}/>
        <ClickDetection/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.flyTo(position);
  return null;

}

function ClickDetection() {
  // Programmatic way to navigate on the  Page like Submitting form
  const navigate = useNavigate();
  useMapEvents({
    click: e => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
}


export default Map;
