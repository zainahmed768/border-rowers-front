"use client";
import { Col, Row } from "antd";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import "../../Home/Expertise/index.css";

const ParticipantsReviews = () => {
  return (
    <div className="ParticipantsReviews">
      <div className="container">
        <Row align={"middle"} gutter={[20, 20]}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="expertise__video">
              <div className="play__icon">
                <Image
                  src={"/home/playVid.svg"}
                  alt="Border Rower"
                  width={38}
                  height={49}
                />
              </div>
              <Image
                src={"/row-around/about-row-thumb.png"}
                width={580}
                height={322}
                alt="Border Rower"
              />
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading
              text={"Participants  Reviews "}
              color={"text-primary"}
            />
            <CustomHeading
              text={
                "Have a look at what row around the world says about challenge"
              }
              color={"text-primary"}
              weight={700}
            />
            <Paragraph
              text={
                "The Row Around the World Challenge takes participants on an extraordinary virtual adventure, allowing them to row on a stationary machine while exploring various global destinations. This dummy testimonial highlights the participant's initial skepticism, their excitement upon discovering the opportunity to travel the world from the comfort of their own home. The use of virtual reality technology is emphasized, enhancing the immersive experience and making it feel like a real-life journey."
              }
              color={"text-primary"}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ParticipantsReviews;
