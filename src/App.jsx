import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import {
  useEffect,
  useState
} from "react";

import ProductPage from "./pages/ProductPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayoutPage from "./pages/AppLayoutPage.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

import CITIES from "../data/cities.json";

// I have been using a Fake API
const BASE_URL = "http://localhost:8000";

// To upload on Netlify, I have store data in the data variable.
const data = CITIES.cities;

// console.log(data);

function App() {
  const [cities, setCities]       = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setCities(data);
    }, 1000);
    setIsLoading(false);
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

  return <BrowserRouter>
    <Routes>
      <Route index={true} element={<Homepage/>}/>
      <Route path={"product"} element={<ProductPage/>}/>
      <Route path={"pricing"} element={<PricingPage/>}/>
      <Route path={"/login"} element={<Login/>}/>

      <Route path={"app"} element={<AppLayoutPage/>}>
        <Route index={true}
               element={<Navigate to={"cities"} replace={true}/>}
        />

        <Route path={"cities"}
               element={<CityList
                 cities={cities}
                 isLoading={isLoading}/>}
        />

        {/* Dynamic route creation step1 , then linking step 2*/}
        <Route path="cities/:id" element={<City/>}/>

        <Route path={"countries"}
               element={<CountryList
                 cities={cities}
                 isLoading={isLoading}/>}
        />

        <Route path={"form"} element={<Form/>}/>
      </Route>

      <Route path={"*"} element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>;
}

export default App;
