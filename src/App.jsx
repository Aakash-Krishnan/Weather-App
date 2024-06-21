import { useState } from "react";
import "./App.css";

import WeatherCard from "./Components/WeatherCard";

import { Col, Flex, Typography } from "antd";

function App() {
  const [hourStyle, setHourStyle] = useState("day");

  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh" }}
      className={hourStyle}
    >
      <Flex vertical>
        <Col>
          <Typography.Title className="title" level={1}>
            Weather App
          </Typography.Title>
          <WeatherCard setHourStyle={setHourStyle} />
        </Col>
      </Flex>
    </Flex>
  );
}

export default App;
