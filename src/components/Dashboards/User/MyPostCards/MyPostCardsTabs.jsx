import { Tabs } from "antd";
import "../MyTeam/index.css";
import PostCard from "./PostCard/PostCard";

const MyPostCardsTabs = () => {
  // Tabs
  const tabItems = [
    {
      key: "1",
      label: `Public`,
      children: <PostCard isPublic={true} params={"public"} />,
    },
    {
      key: "2",
      label: `Private`,
      children: <PostCard isPublic={false} params={"private"} />,
    },
  ];
  return (
    <div className="panel__tabs">
      <Tabs defaultActiveKey="1" items={tabItems} className="full__w-tabs" />
    </div>
  );
};

export default MyPostCardsTabs;
