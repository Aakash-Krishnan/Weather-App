import { useState } from "react";
import "./App.css";

import WeatherCard from "./Components/WeatherCard";

import { Flex, Typography } from "antd";
import WeatherCollections from "./Components/WeatherCollections";

function App() {
  const [hourStyle, setHourStyle] = useState("day");

  return (
    <Flex
      // align="center"
      justify="space-around"
      style={{ height: "100vh" }}
      className={hourStyle}
    >
      <Flex vertical>
        <h1 style={{ color: "white" }}>Collections</h1>
        <WeatherCollections />
      </Flex>
      <Flex vertical justify="center">
        <Typography.Title className="title" level={1}>
          Weather App
        </Typography.Title>
        <WeatherCard setHourStyle={setHourStyle} />
      </Flex>
    </Flex>
  );
}

export default App;
