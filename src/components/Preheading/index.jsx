import "./Preheading.css";
import { Typography } from "antd";

const Preheading = ({
  text,
  color,
  weight,
  margin,
  textTransform,
  textAlign,
}) => {
  return (
    <Typography.Title
      level={4}
      className={`pre__heading medium w-med ${color}`}
      style={{
        fontWeight: weight,
        margin: margin,
        textTransform: textTransform,
        textAlign: textAlign ? textAlign : null,
      }}
    >
      {text}
    </Typography.Title>
  );
};

export default Preheading;
