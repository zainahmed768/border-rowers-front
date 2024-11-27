"use client";
import AdminLayout from "../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import SubTitle from "../../../components/SubTitle/SubTitle";
import InviteFriend from "../../../components/Dashboards/InviteFriend/InviteFriend";
import { inviteFriendData } from "../../../constants";
import { Col, Row } from "antd";

const AllUsers = () => {
  return (
    <AdminLayout>
      <DashboardTitle title={"Organization  Dashboard"} />
      <SubTitle title={"Invite Friends"} />
      <Row gutter={20}>
        {inviteFriendData && inviteFriendData.length > 0
          ? inviteFriendData?.map((card) => (
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={card?.id}
              >
                <InviteFriend
                  src={card?.img}
                  name={card?.name}
                  score={card?.score}
                />
              </Col>
            ))
          : "Not Found"}
        {inviteFriendData && inviteFriendData.length > 0
          ? inviteFriendData?.map((card) => (
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={card?.id}
              >
                <InviteFriend
                  src={card?.img}
                  name={card?.name}
                  score={card?.score}
                />
              </Col>
            ))
          : "Not Found"}
      </Row>
    </AdminLayout>
  );
};

export default AllUsers;
