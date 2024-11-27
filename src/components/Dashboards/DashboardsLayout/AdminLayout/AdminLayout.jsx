import { Layout } from "antd";
// import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "../index.css";

const { Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin__wrapp">
      <div className="container">
        <Layout>
          <Sider
            trigger={null}
            // collapsible
            // collapsed={collapsed}
            style={{ width: "30% !important" }}
          >
            <Sidebar />
          </Sider>
          {/* <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }} 
        />*/}
          <Content>{children}</Content>
        </Layout>
      </div>
    </div>
  );
};

export default AdminLayout;
