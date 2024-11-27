"use client";

import { Col, Row, Skeleton } from "antd";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import "./index.css";
import ChooseCards from "./Cards";
import { useGetAboutContentQuery } from "../../../../features/api/aboutApi";


const WhyChoose = () => {
  // Toolkit
  const { data, isLoading } = useGetAboutContentQuery({
    section: "about_two",
  });
  const aboutTwo = data?.response?.data;
  // Cards Data
  const chooseCards = [
    {
      id: 1,
      image: "/home/challenges.svg",
      title: "Challenges Completed",
      score: aboutTwo?.challenges_completed,
    },
    {
      id: 2,
      image: "/home/members.svg",
      title: "Active Members",
      score: aboutTwo?.active_members,
    },
    {
      id: 3,
      image: "/home/rowers.svg",
      title: "Rowers Registered",
      score: aboutTwo?.rowers_registered,
    },
    {
      id: 4,
      image: "/home/downloads.svg",
      title: "Application Downloads",
      score: aboutTwo?.application_downloads,
    },
  ];

  return (
    <div className="whyChooseUs">
      <div className="container">
        <Row gutter={[20, 20]} align={"middle"}>
          <Col
            lg={{ span: 13 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Row gutter={10} align={"middle"}>
              {chooseCards && chooseCards.length > 0
                ? chooseCards?.map((card) => (
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 24 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                      key={card.id}
                    >
                      <ChooseCards
                        title={card?.title}
                        image={card?.image}
                        score={card?.score}
                        className={`card__${card?.id}`}
                      />
                    </Col>
                  ))
                : "No Data Found"}
            </Row>
          </Col>
          <Col
            lg={{ span: 11 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            {isLoading || aboutTwo == undefined ? (
              <Skeleton paragraph={{ rows: 5 }} active />
            ) : (
              <>
                <Preheading text={aboutTwo?.sub_heading} color={"text-primary"} />
                <CustomHeading
                  text={aboutTwo?.heading}
                  color={"text-primary"}
                  weight={700}
                />
                <Paragraph text={aboutTwo?.paragraph} color={"text-primary"} />
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WhyChoose;
