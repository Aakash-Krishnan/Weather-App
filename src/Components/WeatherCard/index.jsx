import { useState, useCallback, useEffect, useRef, useReducer } from "react";
import "./style.css";

import { Card, Flex, Input, Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ErrorComponent from "../ErrorComponent";
import CardDetails from "../WeatherDetails";

import { getLocation } from "../../utils/getLocationDetails";
import { getHour } from "../../utils/getHour";
import { locationReducer } from "../../utils/reducer/locationReducer";
import AddButton from "../AddButton";

const { Search } = Input;

const WeatherCard = (prop) => {
  const { setHourStyle } = prop;

  const [state, dispatch] = useReducer(locationReducer, {
    isLoading: true,
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
    getLocation(dispatch, searchLocation);

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
                <Flex gap={"10px"}>
                  <Search
                    allowClear
                    value={searchInput}
                    onChange={handleSearch}
                    ref={searchRef}
                    placeholder="Eg: India"
                    onSearch={onSearchHandler}
                    disabled={state.isLoading}
                    enterButton
                  />
                  <AddButton
                    isLoading={state.isLoading}
                    locationDetails={state.locationDetails}
                  />
                </Flex>
                {state.locationError.message ? (
                  <>
                    <ErrorComponent />
                  </>
                ) : state.isLoading ? (
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
