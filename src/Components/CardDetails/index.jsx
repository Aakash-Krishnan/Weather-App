import { Flex, Typography } from "antd";
import "./style.css";

const { Text } = Typography;

const CardDetails = (props) => {
  const { locationDetails, time } = props;
  return (
    <Flex vertical justify="center" align="center">
      <Flex justify="center" align="center" className="country-div">
        <img
          alt="avatar"
          src={locationDetails && locationDetails.current.condition.icon}
        />
        <Typography.Title className="country">
          {locationDetails.location.country}
        </Typography.Title>
      </Flex>

      <Flex gap={10} align="center" justify="center">
        <Text className="detail">
          {time % 12} {time > 12 ? "PM" : "AM"}
        </Text>
        <span className="in">in</span>
        <Text strong className="detail">
          {locationDetails.location.name}
        </Text>
      </Flex>

      <Flex gap={80} className="detail">
        <Flex gap="small" align="center">
          <img className="icon" src="assets/humidity.png" alt="humidity" />
          <Text>
            {locationDetails.current.humidity} g/m<sup>3</sup>
          </Text>
        </Flex>

        <Flex gap="small">
          <Text className="detail">{locationDetails.current.temp_c}&deg;C</Text>
        </Flex>

        <Flex gap="middle" align="center">
          <img className="icon" src="assets/wind-speed.png" alt="wind-speed" />
          <Text>{locationDetails.current.wind_kph} Km/hr</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardDetails;
