import { memo, useEffect, useReducer, useState } from "react";
import "./dropDown.css";

import FavoritesDetails from "./FavoritesDetails";
import LabelContent from "./LabelContent";
import { getLocation } from "../../utils/getLocationDetails";
import { locationReducer } from "../../utils/reducer/locationReducer";
import { getHour } from "../../utils/getHour";
import { LOADING } from "../../constans";

import { Collapse, Spin } from "antd";
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
      dispatch({ type: LOADING });
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
        label: <LabelContent state={state} hour={hour} />,
        children: <FavoritesDetails state={state} />,
      };
      setItem((prev) => [...prev, data]);
    }

    // return () => {};
  }, [item.length, state.locationDetails.location?.name]);

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

const WeatherCache = memo(WeatherDropDown);
export default WeatherCache;
