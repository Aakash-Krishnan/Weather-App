import { useWeatherContext } from "../../utils/Hooks/useWeatherCollection";
import WeatherDropDown from "../WeatherDropDown";

const WeatherCollections = () => {
  const { weatherCollection } = useWeatherContext();
  return (
    <>
      {weatherCollection &&
        weatherCollection.map((location) => (
          <h3 style={{ color: "white" }} key={location.id}>
            <WeatherDropDown location={location} />
          </h3>
        ))}
    </>
  );
};

export default WeatherCollections;
