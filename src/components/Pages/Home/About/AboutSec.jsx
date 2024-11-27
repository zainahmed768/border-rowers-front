"use client";
import { Col, Row, Skeleton } from "antd";
import Preheading from "../../../Preheading";
import "./About.css";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Button from "../../../Button";
import AboutCard from "./Cards";
import { Power3, gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";

gsap.registerPlugin(ScrollTrigger);

const AboutSec = () => {
  // Toolkit
  const {
    data: aboutsecData,
    isLoading,
  } = useGetHomeContentQuery({
    section: "home_three",
  });
  const sectionData = aboutsecData?.response?.data;

  // Making array of object for infoBoxes from API response
  const aboutCards = [
    {
      id: 1,
      image: "/home/challenges.svg",
      title: "Challenges Completed",
      score: sectionData?.challenges_completed,
    },
    {
      id: 2,
      image: "/home/rowers.svg",
      title: "Rowers Registered",
      score: sectionData?.rowers_registered,
    },
    {
      id: 3,
      image: "/home/members.svg",
      title: "Active Members",
      score: sectionData?.active_members,
    },
    {
      id: 4,
      image: "/home/downloads.svg",
      title: "Application Downloads",
      score: sectionData?.application_downloads,
    },
  ];

  // Element Refs
  const textWrapp = useRef();
  const cardsRef = useRef();

  // Gsap
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: textWrapp.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "restart none none none",
        },
      });
      timeline.from(textWrapp.current.children, {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        ease: Power3.ease,
      });
      timeline.from(cardsRef.current.children, {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        ease: Power3.ease,
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section about__sec">
      <div className="container">
        <Row gutter={50} align={"middle"}>
          <Col lg={{ span: 12 }} ref={textWrapp}>
            {isLoading || sectionData == undefined ? <Skeleton paragraph={{rows : 6}} active /> : <Preheading text={sectionData?.heading} color={"text-primary"} />}
            <CustomHeading
              text={sectionData?.sub_heading}
              color={"text-primary"}
              weight={700}
            />
            <Paragraph text={sectionData?.paragraph} color={"text-primary"} />
            <Button
              text={"About Us"}
              isLight={false}
              route={"/about-us"}
              style={{ marginTop: "30px" }}
            />
          </Col>
          <Col lg={{ span: 12 }}>
            <Row gutter={30} ref={cardsRef}>
              {aboutCards && aboutCards.length > 0
                ? aboutCards?.map((card) => (
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                    key={card.id}
                  >
                    {isLoading ? (
                      <Skeleton active />
                    ) : (
                      <AboutCard
                        title={card?.title}
                        image={card?.image}
                        score={card?.score}
                        className={`card__${card?.id}`}
                      />
                    )}
                  </Col>
                ))
                : "No Data Found"}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutSec;
