import { Col, Row } from "antd";
import React from "react";
import { teamCard, teamCardAsCaptian } from "../../../../../constants";
import TeamCard from "../TeamCard/TeamCard";

const Team = ({ asCaptian }) => {
  return (
    <Row gutter={20}>
      {asCaptian ? (
        <>
          {teamCardAsCaptian && teamCardAsCaptian.length > 0
            ? teamCardAsCaptian?.map((card) => (
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  key={card?.id}
                >
                  <TeamCard
                    teamLogo={card?.teamLogo}
                    teamName={card?.teamName}
                    total={card?.total}
                    members={card?.members}
                    slug={card?.slug}
                    asCaptian={asCaptian}
                    
                  />
                </Col>
              ))
            : "Not Found"}
        </>
      ) : (
        <>
          {teamCard && teamCard.length > 0
            ? teamCard?.map((card) => (
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  key={card?.id}
                >
                  <TeamCard
                    teamLogo={card?.teamLogo}
                    teamName={card?.teamName}
                    total={card?.total}
                    members={card?.members}
                    slug={card?.slug}
                    asCaptian={asCaptian}
                  />
                </Col>
              ))
            : "Not Found"}
        </>
      )}
    </Row>
  );
};

export default Team;
