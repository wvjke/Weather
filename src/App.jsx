import { useState, useEffect } from "react";
import "./App.scss";
import { fetchWeather } from "./services/api";
import { InputText } from "primereact/inputtext";
import Forecast from "./components/Forecast";
import { parseCode, parseDay } from "./services/parsers";
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter a city...");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation, () => {});
  }, []);

  const getLocation = async ({ coords }) => {
    const { latitude, longitude } = coords;
    const res = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
    );
    const { address } = await res.json();
    setCity(address.city);
  };

  const onSubmit = async (e) => {
    if (
      weather.city &&
      weather.city.name.toLowerCase() === city.toLowerCase()
    ) {
      return;
    }
    if (e.keyCode === 13) {
      setIsLoading(true);
      const obj = await fetchWeather(city);
      console.log(obj);
      setIsLoading(false);
      if (obj.cod === "200") {
        setWeather(obj);
      } else {
        setPlaceholder("City not found...");
        setCity("");
      }
    }
  };

  const handleChange = (e) => {
    const str = e.replace(/[^a-z -.]/i, "");
    setCity(str);
  };

  return (
    <>
      {!weather.cod ? (
        <div className="main">
          <div className="main_header">
            <img className="main_logo" src="./images/main_logo.png" />
            <div className="title">Weather Forecast</div>
          </div>
          <div className="input">
            <span className="p-input-icon-right">
              {isLoading ? <i className="pi pi-spin pi-spinner" /> : null}
              <InputText
                value={city}
                placeholder={placeholder}
                onKeyDown={(e) => onSubmit(e)}
                onChange={(e) => handleChange(e.target.value)}
              />
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="input">
            <span className="p-input-icon-right">
              {isLoading ? <i className="pi pi-spin pi-spinner" /> : null}
              <InputText
                placeholder={placeholder}
                value={city}
                onKeyDown={(e) => onSubmit(e)}
                onChange={(e) => handleChange(e.target.value)}
              />
            </span>
          </div>
          <div className="main">
            <div className="weather">
              <div className="today">
                <div className="pic">
                  <img
                    src={parseCode(
                      weather.list[0].weather[0].id,
                      weather.list[0].dt_txt
                    )}
                  />
                </div>
                <div className="descr">
                  <h2>Now</h2>
                  <h1>{weather.city.name}</h1>
                  <h3>{`Temperature: ${Math.round(
                    weather.list[0].main.temp
                  )}°C`}</h3>
                  <h3>{weather.list[0].weather[0].main}</h3>
                </div>
              </div>
              <div className="forecast">
                {weather.list.map((item, index) => {
                  const today = parseDay(weather.list[0].dt_txt);
                  const currDay = parseDay(item.dt_txt);
                  const currTime = new Date(item.dt_txt).toLocaleTimeString();
                  if (currDay !== today && currTime === "12:00:00") {
                    return (
                      <Forecast
                        key={index}
                        day={parseDay(item.dt_txt)}
                        temp={`${Math.round(item.main.temp)}°C`}
                        image={parseCode(item.weather[0].id, item.dt_txt)}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
