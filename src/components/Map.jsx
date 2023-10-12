import styles from "./Map.module.css";
import {
  useNavigate,
  useSearchParams
} from "react-router-dom";


function Map() {

  // Programmatic way to navigate on the  Page like Submitting form
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat                             = searchParams.get("lat");
  const lng                             = searchParams.get("lng");


  return (
    <div className={styles.mapContainer}
         onClick={() => {
           navigate("form");
         }}>
      <h1>MAP</h1>
      <h2>Position: {lat} ----- {lng}</h2>
    </div>
  );
}

export default Map;
