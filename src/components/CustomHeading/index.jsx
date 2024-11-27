import "./CustomHeading.css";
import { Typography } from "antd";

const CustomHeading = ({ text, color, weight, margin, fontSize }) => {
  return (
    <Typography.Title
      style={{
        fontWeight: weight,
        margin: margin,
      }}
      level={2}
      className={`custom__heading ${fontSize ? "big" : "standard"} ${color}`}
    >
      {text}
    </Typography.Title>
  );
};

export default CustomHeading;
