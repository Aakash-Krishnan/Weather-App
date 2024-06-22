import { useContext } from "react";
import { WeatherContext } from "../context/weatherContext";

export const useWeatherCollection = () => {
  const data = useContext(WeatherContext);
  return data;
};
