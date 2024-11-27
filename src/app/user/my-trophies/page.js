"use client";
import { Col, Row } from "antd";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import MyTrophyTabs from "../../../components/Dashboards/User/MyTrophies/MyTrophyTabs";
import { Navbar } from "../../../components";

const MyTrophies = () => {
  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        <Row>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <DashboardTitle title={"My Trophies"} />
          </Col>
        </Row>
        <MyTrophyTabs />
      </UserLayout>
    </>
  );
};

export default MyTrophies;
