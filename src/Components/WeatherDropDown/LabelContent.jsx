import { Flex } from "antd";

const LabelContent = ({ state, hour }) => {
  return (
    <Flex align="center" justify="space-between" gap={"10px"}>
      <Flex>
        <img
          className="h-icon"
          alt="avatar"
          src={state.locationDetails?.current?.condition?.icon}
        />
        <Flex vertical>
          <h4>{state.locationDetails?.location?.country}</h4>
          <p className="w-name">{state.locationDetails?.location?.name}</p>
        </Flex>
      </Flex>

      <p className="w-time">
        {hour % 12} {hour > 12 ? "PM" : "AM"}
      </p>
    </Flex>
  );
};

export default LabelContent;
