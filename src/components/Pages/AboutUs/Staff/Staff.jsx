"use client";
import { Col, Row } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import { useGetAboutContentQuery } from "../../../../features/api/aboutApi";
import SelfImage from "../../../SelfImage/SelfImage";

const Staff = () => {
  // Toolkit
  const { data, isLoading } = useGetAboutContentQuery({
    section: "about_four",
  });
  const aboutThree = data?.response?.data;
  // console.log(aboutThree, "three");
  return (
    <div className="Staff">
      <div className="container">
        <Row gutter={20} align={"middle"}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="participate__img">
              <Image
                src={
                  aboutThree?.image ? aboutThree?.image : "/challenge-image.png"
                }
                alt="Border Rower"
                fill
                sizes="100vw"
              />
              {/* <SelfImage src={aboutThree?.image ? aboutThree?.image : "/challenge-image.png"}/> */}
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading text={aboutThree?.sub_heading} color={"text-white"} />
            <CustomHeading
              text={aboutThree?.heading}
              weight={700}
              color={"text-white"}
            />
            <Paragraph text={aboutThree?.paragraph} color={"text-white"} />
          </Col>
        </Row>
        {/* <div className="staff__wrapp">
          <Row gutter={30}>
            {staffData && staffData.length > 0
              ? staffData?.map((card) => (
                  <Col
                    lg={{ span: 6 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 24 }}
                    key={card.id}
                  >
                    <StaffCard
                      key={card?.id}
                      image={card?.img}
                      name={card?.name}
                      designation={card?.desig}
                    />
                  </Col>
                ))
              : "No Data Found"}
          </Row>
        </div> */}
      </div>
    </div>
  );
};

export default Staff;
