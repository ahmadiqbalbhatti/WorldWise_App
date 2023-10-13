// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {
  useEffect,
  useRef,
  useState
} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng]   = useUrlPosition();
  const {createCity} = useCities();

  const navigate                                    = useNavigate();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName]                     = useState("");
  const [country, setCountry]                       = useState("");
  const [date, setDate]                             = useState(new Date());
  const [notes, setNotes]                           = useState("");
  const [emoji, setEmoji]                           = useState("");
  const [geoCodingError, setGeoCodingError]         = useState("");

  const formRef = useRef(null);


  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");
        setDate(new Date());
        const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data     = await response.json();
        console.log(data);

        if (!data.countryCode) {
          throw new Error("That doesn't seems like a city. Please Click some"
                          + " where else 🤔");
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        console.log("Done");
        setIsLoadingGeoCoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng},
      id      : Date.now()
    };

    createCity(newCity);
    navigate("/app/cities");
    formRef.current.reset();
  }

  if (isLoadingGeoCoding) return <Spinner/>;

  if (!lat && !lng) return <Message
    message={"💁🏼‍♂️💁🏼‍ Start by clicking on the Map👆🏼"}/>;

  if (geoCodingError) return <Message message={geoCodingError}/>;

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id={"date"} selected={date}
                    onChange={date => setDate(date)}
                    dateFormate={"dd/MM/yyyy"}
        />

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
