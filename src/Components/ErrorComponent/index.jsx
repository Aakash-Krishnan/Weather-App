import { Flex, Typography } from "antd";

const ErrorComponent = () => {
  return (
    <Flex justify="center" align="center" style={{ margin: "50px" }}>
      <Flex>
        <Typography.Title>No match on this location :(</Typography.Title>
      </Flex>
    </Flex>
  );
};

export default ErrorComponent;
