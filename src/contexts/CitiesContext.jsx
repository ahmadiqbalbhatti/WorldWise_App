import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from "react";
import CITIES from "../../data/cities.json";

const data = CITIES.cities;

const initialState = {
  cities     : [],
  isLoading  : false,
  currentCity: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state, isLoading: true
      };

    case "city/loaded":
      return {
        ...state, isLoading: false, currentCity: action.payload
      };
    case "cities/loaded":
      return {
        ...state, isLoading: false, cities: action.payload
      };
    case "city/created":
      return {
        ...state,
        isLoading  : false,
        cities     : [...state.cities, action.payload],
        currentCity: action.payload
      };
    case "city/deleted":
      return {
        ...state,
        isLoading  : false,
        cities     : state.cities.filter(city => city.id !== action.payload),
        currentCity: {}
      };
    default:
      throw new Error("Unknown Action type");

  }
}


const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {
  const [
          {
            cities,
            isLoading,
            currentCity
          }, dispatch
        ] = useReducer(reducer, initialState);


  // const [cities, setCities]           = useState([]);
  // const [isLoading, setIsLoading]     = useState(false);
  // const [currentCity, setCurrentCity] = useState({});


  useEffect(() => {
    dispatch({type: "loading"});
    // console.log(isLoading);
    setTimeout(() => {
      dispatch({type: "cities/loaded", payload: data});
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
      if (cities[index].id === Number(id)) {
        // setCurrentCity(cities[index]);
        dispatch({type: "city/loaded", payload: cities[index]});
      }
    }
  }


  function createCity(newCity) {
    dispatch({type: "loading"});

    dispatch({type: "city/created", payload: newCity});
    console.log(cities);
  }


  function deleteCity(cityId) {
    dispatch({type: "city/deleted", payload: cityId});
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

