import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message.jsx";

function CityList({cities, isLoading}) {
  if (isLoading) return <Spinner/>;

  if (!cities.length) return <Message message={"Add your first city by"
                                               + " clicking on the map"}/>;

  return (
    <ul className={styles.cityList}>
      {
        // eslint-disable-next-line react/prop-types
        cities.map(city => <CityItem key={city.id} city={city}/>)
      }

    </ul>
  );
}


export default CityList;
