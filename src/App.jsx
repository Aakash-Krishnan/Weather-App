import { useState } from "react";
import "./App.css";

import WeatherCard from "./Components/WeatherCard";

import { Flex, Typography } from "antd";
import WeatherCollections from "./Components/WeatherCollections";
import { useWeatherContext } from "./utils/Hooks/useWeatherCollection";

function App() {
  const [hourStyle, setHourStyle] = useState("day");
  const { weatherCollection } = useWeatherContext();

  return (
    <Flex
      justify={weatherCollection.length ? "space-around" : "center"}
      style={{ height: "100vh" }}
      className={hourStyle}
    >
      {weatherCollection.length > 0 && (
        <Flex vertical justify="normal" className="collections-container">
          <h1 className="collections-header">Favorite locations</h1>
          <Flex className="collections.body" vertical justify="start">
            <WeatherCollections />
          </Flex>
        </Flex>
      )}
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
