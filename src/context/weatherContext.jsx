import { useState, createContext } from "react";

export const WeatherContext = createContext({});

export const WeatherProvider = (props) => {
  const [weatherCollection, setWeatherCollection] = useState([]);
  return (
    <WeatherContext.Provider
      value={{ weatherCollection, setWeatherCollection }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
