import { useState, useCallback, useEffect, useRef, useReducer } from "react";
import "./style.css";

import { Card, Flex, Input, Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ErrorComponent from "../ErrorComponent";
import CardDetails from "../WeatherDetails";

import { getLocationDetails } from "../../utils/getLocationDetails";
import { getHour } from "../../utils/getHour";
import { locationReducer } from "./locationReducer";

const { Search } = Input;

const WeatherCard = (prop) => {
  const { setHourStyle } = prop;

  const [state, dispatch] = useReducer(locationReducer, {
    spinner: true,
    locationDetails: {},
    locationError: {},
  });

  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [time, setTime] = useState(0);

  const searchRef = useRef(null);

  const handleSearch = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const onSearchHandler = useCallback(() => {
    setSearchLocation(searchInput);
    setSearchInput("");
  }, [searchInput]);

  useEffect(() => {
    searchRef.current?.focus();

    const [hour, type] = getHour(state.locationDetails);
    setTime(hour);
    setHourStyle((prev) => (type ? type : prev));

    // return () => {};
  }, [state.locationDetails, setHourStyle, state.locationError]);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    (async () => {
      try {
        const res = await getLocationDetails(searchLocation);
        if (res?.error) throw new Error(res.error.message);
        dispatch({ type: "SUCCESS", payload: res });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err });
      }
    })();

    // return () => {};
  }, [searchLocation]);

  return (
    <>
      <Row>
        <Col>
          <Card
            hoverable
            className="card"
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
                minHeight: 200,
              },
            }}
          >
            <Flex>
              <Flex className="card-details-container" vertical>
                <Search
                  allowClear
                  value={searchInput}
                  onChange={handleSearch}
                  ref={searchRef}
                  placeholder="Eg: India"
                  onSearch={onSearchHandler}
                  disabled={state.spinner}
                  enterButton
                />

                {state.locationError.message ? (
                  <>
                    <ErrorComponent />
                  </>
                ) : state.spinner ? (
                  <Spin
                    className="spin"
                    indicator={<LoadingOutlined spin />}
                    size="large"
                  />
                ) : (
                  <CardDetails
                    locationDetails={state.locationDetails}
                    time={time}
                  />
                )}
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default WeatherCard;
