import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";

function CountryList({cities, isLoading}) {
  if (isLoading) return <Spinner/>;


  const countries = cities.reduce((array, city) => {
    // Check if the country is already in the result array
    const existingCountry = array.find(item => item.country === city.country);

    if (!existingCountry) {
      // If the country is not in the result array, add it
      array.push({
        country: city.country, emoji: city.emoji
      });
    }
    return array;
  }, []);


  if (!countries.length) return <Message
    message={"Add your first city to add country by clicking" + " on the map"}/>;
  return (
    <ul className={styles.countryList}>
      {// eslint-disable-next-line react/prop-types
        countries.map((country) => <CountryItem key={country.country}
                                                country={country}/>)}

    </ul>
  );
}


export default CountryList;
