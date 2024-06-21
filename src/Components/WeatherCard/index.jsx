import { useState, useCallback, useEffect, useRef, useReducer } from "react";

import { Card, Flex, Input, Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ErrorComponent from "../ErrorComponent";
import CardDetails from "../CardDetails";

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
            style={{ minWidth: 520 }}
            styles={{
              body: {
                padding: 0,
                overflow: "hidden",
                minHeight: 200,
              },
            }}
          >
            <Flex>
              <Flex
                vertical
                style={{
                  padding: 32,
                  width: "100%",
                }}
              >
                <Search
                  allowClear
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
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
                    style={{
                      margin: "60px",
                    }}
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
