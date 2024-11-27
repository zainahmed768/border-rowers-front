"use client";
import { Col, Row, Skeleton } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import { useGetAboutContentQuery } from "../../../../features/api/aboutApi";


const HowItStarted = () => {
  // Toolkit
  const { data, isLoading } = useGetAboutContentQuery({
    section: "about_one",
  });
  const aboutOne = data?.response?.data;

  return (
    <div className="howItStarted">
      <div className="container">
        <Row gutter={20} align={"middle"}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            {isLoading || aboutOne == undefined ? (
              <Skeleton paragraph={{ rows: 5 }} active />
            ) : (
              <>
                <Preheading text={aboutOne?.heading} color={"text-primary"} />
                <CustomHeading
                  text={aboutOne?.sub_heading}
                  color={"text-primary"}
                  weight={700}
                />
                <Paragraph text={aboutOne?.paragraph} color={"text-primary"} />
              </>
            )}
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
                  {isLoading || aboutOne == undefined ? (
                    <Skeleton.Image active />
                  ) : (
                    <Image
                      src={aboutOne?.image_one}
                      fill
                      sizes="100vw"
                      alt="Border Rowers"
                    />
                  )}
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
                  {isLoading || aboutOne == undefined ? (
                    <Skeleton.Image active />
                  ) : (
                    <Image
                      src={aboutOne?.image_two}
                      fill
                      sizes="100vw"
                      alt="Border Rowers"
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HowItStarted;
