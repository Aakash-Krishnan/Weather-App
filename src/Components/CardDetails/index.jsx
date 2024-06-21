import { Flex, Typography } from "antd";
import "./style.css";

const imgStyle = {
  display: "inline",
};

const { Text } = Typography;

const CardDetails = (props) => {
  const { locationDetails, time } = props;
  return (
    <Flex vertical justify="center" align="center">
      <Flex
        justify="center"
        align="center"
        style={{ marginTop: "10px", marginRight: "30px" }}
      >
        <img
          alt="avatar"
          src={locationDetails && locationDetails.current?.condition.icon}
          style={imgStyle}
        />
        <Typography.Title style={{ marginBottom: "0px", whiteSpace: "nowrap" }}>
          {locationDetails.location?.country}
        </Typography.Title>
      </Flex>

      <Flex gap={10} align="center" justify="center">
        <Text className="detail">
          {time % 12} {time > 12 ? "PM" : "AM"}
        </Text>
        <span style={{ position: "relative", top: "4px" }}>in</span>
        <Text strong className="detail">
          {locationDetails.location?.name}
        </Text>
      </Flex>

      <Flex gap={80} className="detail">
        <Flex gap="small" align="center">
          <img className="icon" src="assets/humidity.png" alt="humidity" />
          <Text>
            {locationDetails.current?.humidity} g/m<sup>3</sup>
          </Text>
        </Flex>

        <Flex gap="small">
          <Text className="detail">
            {locationDetails.current?.temp_c}&deg;C
          </Text>
        </Flex>

        <Flex gap="middle" align="center">
          <img className="icon" src="assets/wind-speed.png" />
          <Text>{locationDetails.current?.wind_kph} Km/hr</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardDetails;
