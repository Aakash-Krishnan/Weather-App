import { useEffect, useReducer, useState } from "react";
import "./dropDown.css";

import { getLocation } from "../../utils/getLocationDetails";
import { locationReducer } from "../../utils/locationReducer";
import { getHour } from "../../utils/getHour";

import { Collapse, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const WeatherDropDown = (props) => {
  const { location } = props;
  const { id, area } = location;

  const [state, dispatch] = useReducer(locationReducer, {
    spinner: true,
    locationDetails: {},
    locationError: {},
  });

  const [item, setItem] = useState([]);

  const loadingSpinner = [
    {
      key: "1",
      label: "Loading...",
      children: (
        <Spin className="w-spin" indicator={<LoadingOutlined spin />} />
      ),
    },
  ];

  useEffect(() => {
    const makeApiCall = () => {
      dispatch({ type: "LOADING" });
      getLocation(dispatch, area);
    };

    makeApiCall();

    const intervalId = setInterval(() => {
      console.log("Updating the your weather detail.");
      makeApiCall();
    }, 1_800_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [area]);

  useEffect(() => {
    if (state.locationDetails?.location?.name && item.length === 0) {
      const [hour] = getHour(state.locationDetails);

      const data = {
        key: id,
        label: (
          <Flex align="center" justify="space-between" gap={"10px"}>
            <Flex>
              <img
                className="h-icon"
                alt="avatar"
                src={state.locationDetails.current.condition.icon}
              />
              <Flex vertical>
                <h4>{state.locationDetails.location.country}</h4>
                <p className="w-name">{state.locationDetails.location.name}</p>
              </Flex>
            </Flex>

            <p className="w-time">
              {hour % 12} {hour > 12 ? "PM" : "AM"}
            </p>
          </Flex>
        ),
        children: (
          <Flex gap={24} className="w-detail" align="center">
            <Flex gap="small" align="center">
              <img
                className="w-icon"
                src="assets/humidity.png"
                alt="humidity"
              />
              <p>
                {state.locationDetails.current.humidity} g/m<sup>3</sup>
              </p>
            </Flex>

            <Flex gap="small">
              <p className="w-temp">
                {state.locationDetails.current.temp_c}&deg;C
              </p>
            </Flex>

            <Flex gap="middle" align="center">
              <img
                className="w-icon"
                src="assets/wind-speed.png"
                alt="wind-speed"
              />
              <p>{state.locationDetails.current.wind_kph} Km/hr</p>
            </Flex>
          </Flex>
        ),
      };
      setItem((prev) => [...prev, data]);
    }

    // return () => {};
  }, [
    id,
    item.length,
    state.locationDetails,
    state.locationDetails.location?.name,
  ]);

  return (
    <div>
      <Collapse
        style={{ backgroundColor: "white", width: "300px" }}
        items={!item.length ? loadingSpinner : item}
        defaultActiveKey={["1"]}
      />
    </div>
  );
};

export default WeatherDropDown;
