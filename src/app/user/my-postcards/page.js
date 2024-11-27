"use client";
import { Col, Row } from "antd";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import MyPostCardsTabs from "../../../components/Dashboards/User/MyPostCards/MyPostCardsTabs";
import { Navbar } from "../../../components";

const MyPostCards = () => {
 
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
            <DashboardTitle title={"My Postcards"} />
          </Col>
        </Row>
        <MyPostCardsTabs />
      </UserLayout>
    </>
  );
};

export default MyPostCards;
