import styles from "./CityList.module.css";
import {useCities} from "../contexts/CitiesContext.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

function CityList() {
  const {cities, isLoading} = useCities();
  //
  // console.log(cities, isLoading);

  if (isLoading) return <Spinner/>;

  if (!cities.length) return <Message
    message={"Add your first city by" + " clicking on the map"}/>;

  return (
    <ul className={styles.cityList}>
      {// eslint-disable-next-line react/prop-types
        cities.map(city => <CityItem key={city.id} city={city}/>)}
    </ul>
  );
}


export default CityList;
