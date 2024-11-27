import "./index.css";
import { Spin } from "antd";

const PreLoader = () => {
  return (
    <div className="pre__loading">
      <Spin size="large"/>
    </div>
  );
};

export default PreLoader;
