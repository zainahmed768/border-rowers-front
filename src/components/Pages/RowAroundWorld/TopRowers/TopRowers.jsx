"use client";
import { Col, Row } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import { topRowers } from "../../../../constants";
import RowerCard from "./RowerCard/RowerCard";
const TopRowers = () => {
  return (
    <div className="TopRowers">
      <div className="container">
        <Row>
          <Col
            lg={{ span: 11 }}
            md={{ span: 11 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading text={"most Recent top rowers"} color={"text-white"} />
            <CustomHeading
              text={
                "Get Inspired by the best row around the world participants"
              }
              color={"text-white"}
            />
          </Col>
          <Col
            lg={{ span: 3 }}
            md={{ span: 3 }}
            sm={{ span: 0 }}
            xs={{ span: 0 }}
          ></Col>
          <Col
            lg={{ span: 10 }}
            md={{ span: 10 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Paragraph
              margin={0}
              text={
                "These participants have pushed themselves to the limits, rowing on their machines for countless hours as they explore virtual landscapes that span the globe. Their experiences highlight the incredible power of virtual reality technology Their commitment to the challenge, coupled with their unwavering enthusiasm, serves as a beacon of inspiration for those seeking to test their limits."
              }
              color={"text-white"}
            />
          </Col>
        </Row>
        <br />
        <div className="top__rowers">
          <Row gutter={40}>
            {topRowers && topRowers.length > 0
              ? topRowers?.map((rower) => (
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    key={rower?.id}
                  >
                    <RowerCard
                      id={rower?.id}
                      image={rower?.image}
                      name={rower?.name}
                      team={rower?.team}
                      score={rower?.score}
                    />
                  </Col>
                ))
              : "Not Found"}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TopRowers;
