import { useContext } from "react";
import { WeatherContext } from "../../context/weatherContext";

export const useWeatherContext = () => {
  const data = useContext(WeatherContext);
  return data;
};
