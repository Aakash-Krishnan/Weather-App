import { useWeatherCollection } from "../../utils/useWeatherCollection";

import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider, Space } from "antd";

const colors1 = ["#6253E1", "#04BEFE"];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const AddButton = (props) => {
  const { locationDetails } = props;
  const { weatherCollection, setWeatherCollection } = useWeatherCollection();

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
        <Button
          type="primary"
          size="medium"
          disabled={Object.keys(locationDetails).length ? false : true}
          onClick={handleClick}
        >
          Add
        </Button>
      </ConfigProvider>
    </Space>
  );
};

export default AddButton;
