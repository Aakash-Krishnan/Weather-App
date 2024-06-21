import { useState, useCallback, useEffect, useRef } from "react";

import { Card, Flex, Input, Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import ErrorComponent from "../ErrorComponent";
import CardDetails from "../CardDetails";

import { getLocationDetails } from "../../utils/getLocationDetails";
import { getHour } from "../../utils/useHour";

const { Search } = Input;

const WeatherCard = (prop) => {
  const { setHourStyle } = prop;

  const [spinner, setSpinner] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [locationDetails, setLocationDetails] = useState({});
  const [locationError, setLocationError] = useState({});
  const [time, setTime] = useState(0);

  const searchRef = useRef(null);

  const onSearchHandler = useCallback(() => {
    setSearchLocation(searchInput);
    setSearchInput("");
  }, [searchInput]);

  useEffect(() => {
    searchRef.current?.focus();

    const [hour, type] = getHour(locationDetails);
    setTime(hour);
    setHourStyle(type);

    return () => {};
  }, [locationDetails, setHourStyle]);

  useEffect(() => {
    setSpinner(true);

    (async () => {
      try {
        const res = await getLocationDetails(searchLocation);
        setLocationDetails(res);
        setSpinner(false);
      } catch (err) {
        setLocationError(err);
      }
    })();

    return () => {};
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
                  disabled={spinner}
                  enterButton
                />

                {locationError.message ? (
                  <>
                    <ErrorComponent />
                  </>
                ) : spinner ? (
                  <Spin
                    style={{
                      margin: "60px",
                    }}
                    indicator={<LoadingOutlined spin />}
                    size="large"
                  />
                ) : (
                  <CardDetails locationDetails={locationDetails} time={time} />
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
