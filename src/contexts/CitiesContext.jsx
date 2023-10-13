import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import CITIES from "../../data/cities.json";

const data = CITIES.cities;

const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {

  const [cities, setCities]           = useState([]);
  const [isLoading, setIsLoading]     = useState(false);
  const [currentCity, setCurrentCity] = useState({});


  useEffect(() => {
    setIsLoading(true);
    // console.log(isLoading);
    setTimeout(() => {
      setCities(data);
      setIsLoading(false);
    }, 1000);

    /*    async function fetchCities() {
     try {
     setIsLoading(true);
     const response = await fetch(`${BASE_URL}/cities`);
     // console.log(response);
     if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
     }
     const data = await response.json();
     setCities(data);
     console.log(data);
     } catch (error) {
     console.error("Error while loading data:", error);
     } finally {
     setIsLoading(false);
     }
     }

     fetchCities();*/
  }, []);

  /*  async function getCity(id) {
   try {
   setIsLoading(true);
   const response = await fetch(`http://localhost:8000/cities/${id}`);
   // console.log(response);
   if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
   }
   const data = await response.json();
   setCurrentCity(data);
   // console.log(data);
   } catch (error) {
   console.error("Error while loading data:", error);
   } finally {
   setIsLoading(false);
   }
   }*/

  function getCity(id) {
    for (const index in cities) {
      // console.log(data[index].id === id);
      if (cities[index].id === id) {
        setCurrentCity(cities[index]);
      }
    }
  }


  function createCity(newCity) {
    setCities(prevCities => [...prevCities, newCity]);
    console.log(cities);
  }


  function deleteCity(cityId) {
    setCities(prevCities => prevCities.filter(city => city.id !== cityId));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities, isLoading, currentCity, getCity, createCity, deleteCity
      }}>
      {children}
    </CitiesContext.Provider>
  );

}


// eslint-disable-next-line react-refresh/only-export-components
export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("▶▶▶ CitiesContext is used out side of the Scope ▶▶▶");

  return context;
}

export default CitiesProvider;

