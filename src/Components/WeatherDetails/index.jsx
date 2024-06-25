import { Flex, Typography, Tooltip } from "antd";
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
        <Tooltip title="Country" color="blue">
          <Typography.Title className="country">
            {locationDetails.location.country}
          </Typography.Title>
        </Tooltip>
      </Flex>

      <Flex gap={10} align="center" justify="center">
        <Text className="detail">
          {time % 12} {time > 12 ? "PM" : "AM"}
        </Text>
        <span className="in">in</span>
        <Tooltip title="City" color="blue">
          <Text strong className="detail">
            {locationDetails.location.name}
          </Text>
        </Tooltip>
      </Flex>

      <Flex gap={80} className="detail">
        <Tooltip title="Humidity" color="blue">
          <Flex gap="small" align="center">
            <img className="icon" src="assets/humidity.png" alt="humidity" />
            <Text>
              {locationDetails.current.humidity} g/m<sup>3</sup>
            </Text>
          </Flex>
        </Tooltip>

        <Tooltip title="Temperature" color="blue">
          <Flex gap="small">
            <Text className="detail">
              {locationDetails.current.temp_c}&deg;C
            </Text>
          </Flex>
        </Tooltip>

        <Tooltip title="Wind speed" color="blue">
          <Flex gap="middle" align="center">
            <img
              className="icon"
              src="assets/wind-speed.png"
              alt="wind-speed"
            />
            <Text>{locationDetails.current.wind_kph} Km/hr</Text>
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default CardDetails;
