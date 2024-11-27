import { Typography } from "antd";
import "./index.css";
const SubTitle = ({ title }) => {
  return (
    <Typography.Title level={3} className="sub__title text-primary">
      {title}
    </Typography.Title>
  );
};

export default SubTitle;
