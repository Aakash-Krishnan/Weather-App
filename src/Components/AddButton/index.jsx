import { useRef, useEffect, useState } from "react";
import { useWeatherContext } from "../../utils/Hooks/useWeatherCollection";

import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Space, Tooltip } from "antd";

const colors1 = ["#6253E1", "#04BEFE"];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const AddButton = (props) => {
  const { locationDetails, isLoading } = props;

  const [os, setOS] = useState("");

  const { weatherCollection, setWeatherCollection } = useWeatherContext();

  const addBtnRef = useRef(null);

  useEffect(() => {
    const detectedOS = getOS();
    console.log("detectedOS", detectedOS);
    setOS(detectedOS);

    const handleKeyDown = (e) => {
      if ((e.altKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        addBtnRef.current.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getOS = () => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Win") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "Mac";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    if (userAgent.indexOf("X11") !== -1) return "Unix";
    return "Unknown";
  };

  const handleClick = () => {
    const area = locationDetails.location.name;

    if (!weatherCollection.some((location) => location.area === area)) {
      setWeatherCollection((prev) => [...prev, { id: Date.now(), area }]);
    }
  };

  return (
    <Space>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                colors1
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                colors1
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Tooltip title={os === "Windows" ? "alt + a" : "cmd + a"} color="blue">
          <Button
            ref={addBtnRef}
            type="primary"
            size="medium"
            disabled={
              !isLoading && Object.keys(locationDetails).length ? false : true
            }
            onClick={handleClick}
          >
            Add
          </Button>
        </Tooltip>
      </ConfigProvider>
    </Space>
  );
};

export default AddButton;
