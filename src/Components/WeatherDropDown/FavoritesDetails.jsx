import { Flex } from "antd";
import "./dropDown.css";

const FavoritesDetails = ({ state }) => {
  return (
    <Flex gap={24} className="w-detail" align="center">
      <Flex gap="small" align="center">
        <img className="w-icon" src="assets/humidity.png" alt="humidity" />
        <p>
          {state.locationDetails.current.humidity} g/m<sup>3</sup>
        </p>
      </Flex>

      <Flex gap="small">
        <p className="w-temp">{state.locationDetails.current.temp_c}&deg;C</p>
      </Flex>

      <Flex gap="middle" align="center">
        <img className="w-icon" src="assets/wind-speed.png" alt="wind-speed" />
        <p>{state.locationDetails.current.wind_kph} Km/hr</p>
      </Flex>
    </Flex>
  );
};

export default FavoritesDetails;
