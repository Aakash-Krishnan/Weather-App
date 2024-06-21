import { useState, useCallback, useEffect, useRef } from "react";

import { Card, Flex, Input, Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { getLocationDetails } from "../../utils/getLocationDetails";
import ErrorComponent from "../ErrorComponent";

import CardDetails from "../CardDetails";

const { Search } = Input;

const cardStyle = {
  minWidth: 520,
};

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

    const localTime = locationDetails.location?.localtime;
    const hour = new Date(localTime).getHours();

    if (hour < 4 || hour >= 18) {
      setTime(hour);
      setHourStyle("day");
    } else if (hour >= 4 || hour < 18) {
      setTime(hour);
      setHourStyle("night");
    }
  }, [locationDetails?.location, setHourStyle]);

  useEffect(() => {
    setSpinner(true);

    getLocationDetails(searchLocation)
      .then((res) => {
        setLocationDetails(res);
        setSpinner(false);
      })
      .catch((err) => setLocationError(err));
  }, [searchLocation]);

  return (
    <>
      <Row>
        <Col>
          <Card
            hoverable
            style={cardStyle}
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
