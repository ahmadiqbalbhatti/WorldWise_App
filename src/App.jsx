import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import CitiesProvider from "./contexts/CitiesContext.jsx";
import {
  lazy,
  Suspense
} from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import ProductPage from "./pages/ProductPage.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import PricingPage from "./pages/PricingPage.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";
// import AppLayoutPage from "./pages/AppLayoutPage.jsx";
// import Login from "./pages/Login.jsx";

// ----------- APPLYING LAZY LOADING ---------
const Homepage      = lazy(() => import("./pages/Homepage.jsx"));
const ProductPage   = lazy(() => import("./pages/ProductPage.jsx"));
const PricingPage   = lazy(() => import("./pages/PricingPage.jsx"));
const PageNotFound  = lazy(() => import("./pages/PageNotFound.jsx"));
const AppLayoutPage = lazy(() => import("./pages/AppLayoutPage.jsx"));
const Login         = lazy(() => import("./pages/Login.jsx"));


/*
 import CITIES from "../data/cities.json";

 I have been using a Fake API
 const BASE_URL = "http://localhost:8000";

 To upload on Netlify, I have stored data in the data variable.
 const data = CITIES.cities;

 console.log(data);*/

function App() {


  return (
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index={true} element={<Homepage/>}/>
            <Route path={"product"} element={<ProductPage/>}/>
            <Route path={"pricing"} element={<PricingPage/>}/>
            <Route path={"/login"} element={<Login/>}/>

            <Route path={"app"} element={<AppLayoutPage/>}>
              <Route index={true}
                     element={<Navigate to={"cities"} replace={true}/>}
              />

              <Route path={"cities"} element={<CityList/>}/>

              {/* Dynamic route creation step1 , then linking step 2*/}
              <Route path="cities/:id" element={<City/>}/>
              <Route path={"countries"} element={<CountryList/>}/>
              <Route path={"form"} element={<Form/>}/>
            </Route>

            <Route path={"*"} element={<PageNotFound/>}/>
          </Routes>
        </Suspense>

      </BrowserRouter>
    </CitiesProvider>

  );
}

export default App;
