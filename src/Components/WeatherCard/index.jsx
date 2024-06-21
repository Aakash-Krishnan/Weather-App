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

  const [search, setSearch] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [locationDetails, setLocationDetails] = useState({});
  const [locationError, setLocationError] = useState({});
  const [time, setTime] = useState(0);

  const searchRef = useRef(null);

  const onSearchHandler = useCallback((value) => {
    setSearch(value);
  }, []);

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
  }, [locationDetails.location, setHourStyle]);

  useEffect(() => {
    setSpinner(true);

    getLocationDetails(search)
      .then((res) => {
        setLocationDetails(res);
        setSpinner(false);
      })
      .catch((err) => setLocationError(err));
  }, [search]);

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
