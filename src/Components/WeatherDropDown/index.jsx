import { useEffect, useReducer, useState } from "react";

import { getLocation } from "../../utils/getLocationDetails";
import { locationReducer } from "../../utils/locationReducer";

import { Collapse, Flex } from "antd";

const WeatherDropDown = (props) => {
  const { location } = props;
  const { id, area } = location;

  const [state, dispatch] = useReducer(locationReducer, {
    spinner: true,
    locationDetails: {},
    locationError: {},
  });

  const [item, setItem] = useState([]);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    getLocation(dispatch, area);

    // return () => {};
  }, [area]);

  useEffect(() => {
    if (state.locationDetails?.location?.name && item.length === 0) {
      const data = {
        key: id,
        label: (
          <Flex>
            <Flex align="center">
              <img
                alt="avatar"
                src={state.locationDetails.current.condition.icon}
              />
              <h4>{state.locationDetails.location.country}</h4>
            </Flex>

            <p>{}</p>
          </Flex>
        ),
        children: <p>Hi</p>,
      };
      setItem((prev) => [...prev, data]);
    }

    // return () => {};
  }, [id, item, item.length, state.locationDetails?.location?.name]);

  return (
    <div>
      {item && (
        <Collapse
          style={{ backgroundColor: "white" }}
          items={item}
          defaultActiveKey={["1"]}
        />
      )}
    </div>
  );
};

export default WeatherDropDown;
