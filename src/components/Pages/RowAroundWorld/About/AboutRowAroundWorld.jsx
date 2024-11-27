"use client";
import { Col, Row } from "antd";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import "../../AboutUs/HowItStarted/index.css";
import "./AboutRow.css";
const AboutRowAroundWorld = () => {
  return (
    <div className="AboutRowAroundWorld">
      <div className="container">
        <Row gutter={20} align={"middle"}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading text={"About Row Around World"} color={"text-primary"} />
            <CustomHeading
              text={
                "participate in Border Rowers  most famous Row around the world challenge "
              }
              color={"text-primary"}
              weight={700}
            />
            <Paragraph
              text={
                "One of the things that set the Border Rowers apart from other rowing clubs was their commitment to charity. Every season, they would organize a charity challenge where members would row for a certain distance or time, and raise money for a chosen charity."
              }
              color={"text-primary"}
            />
            <Paragraph
              text={
                "Over the years, the Border Rowers Club has continued to grow and evolve, but their commitment to rowing and giving back to their communities remains unchanged. They are now recognized as one of the premier rowing clubs in the world, and continue to inspire and connect rowing enthusiasts everywhere."
              }
              color={"text-primary"}
            />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Row gutter={20}>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
                style={{ alignSelf: "flex-start" }}
              >
                <div className="about__image-wrap wrap__one">
                  <Image
                    src={"/row-around/row1.png"}
                    fill
                    sizes="100vw"
                    alt="Border Rowers"
                  />
                </div>
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
                style={{ alignSelf: "flex-start" }}
              >
                <div className="about__image-wrap wrap__two">
                  <Image
                    src={"/row-around/row2.png"}
                    fill
                    sizes="100vw"
                    alt="Border Rowers"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutRowAroundWorld;
