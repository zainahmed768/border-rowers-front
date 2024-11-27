import { Tabs } from "antd";
import "../MyTeam/index.css";
import Trophy from "./Trophy/Trophy";

const tabItems = [
  {
    key: "1",
    label: `Public`,
    children: <Trophy isPublic={true} params={"public"} />,
  },
  {
    key: "2",
    label: `private`,
    children: <Trophy isPublic={false} params={"private"} />,
  },
];
const MyTrophyTabs = () => {
  return (
    <div className="panel__tabs">
      <Tabs defaultActiveKey="1" items={tabItems} className="full__w-tabs" />
    </div>
  );
};

export default MyTrophyTabs;
