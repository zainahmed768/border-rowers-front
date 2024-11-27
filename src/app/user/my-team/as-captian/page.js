"use client";

import { Col, Row } from "antd";
import DashboardTitle from "../../../../components/Dashboards/DashboardTitle";
import UserLayout from "../../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import TeamCardSingle from "../../../../components/Dashboards/User/MyTeam/TeamCardSingle/TeamCardSingle";
import { teamSingleData } from "../../../../constants";
import { Navbar } from "../../../../components";

const MyTeamSingle = () => {
  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        <DashboardTitle title={"My Teams"} />
        <Row gutter={20}>
          {teamSingleData && teamSingleData.length > 0
            ? teamSingleData?.map((card) => (
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  key={card?.id}
                >
                  <TeamCardSingle
                    image={card?.img}
                    name={card?.name}
                    score={card?.score}
                    isCaptian={card?.isCaptian}
                    asCaptian={true}
                  />
                </Col>
              ))
            : "Not Found"}
        </Row>
      </UserLayout>
    </>
  );
};

export default MyTeamSingle;
