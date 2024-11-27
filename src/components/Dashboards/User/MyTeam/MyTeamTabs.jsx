import { Tabs } from "antd";
import Team from "./Team/Team";
import "./index.css";

const tabItems = [
  {
    key: "1",
    label: `As a Captain`,
    children: <Team asCaptian={true}/>,
  },
  {
    key: "2",
    label: `As a Member`,
    children: <Team asCaptian={false} />,
  },
];
const MyTeamTabs = () => {
  return (
    <div className="panel__tabs">
      <Tabs defaultActiveKey="1" items={tabItems} className="full__w-tabs" />
    </div>
  );
};

export default MyTeamTabs;
