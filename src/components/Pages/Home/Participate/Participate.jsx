"use client";

import { Col, Row, Skeleton } from "antd";

import Image from "next/image";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Button from "../../../Button";
import "./Participate.css";

import { Power4, gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";
gsap.registerPlugin(ScrollTrigger);



const Participate = () => {
  // Toolkit
  const { data, isLoading } = useGetHomeContentQuery({
    section: "home_two",
  });
  const sectionData = data?.response?.data;

  // Element Refs
  const participate = useRef();
  const participateText = useRef();
  const participateImg = useRef();

  // Gsap
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: participate.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "restart none none none",
        },
      });
      timeline.from(participate.current, { opacity: 0, y: 50, duration: 1 });
      timeline.from(participateImg.current, { opacity: 0, x: -100 });
      timeline.from(participateText.current.children, {
        opacity: 0,
        x: -100,
        stagger: 0.2,
        ease: Power4.ease,
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section participate" ref={participate}>
      <div className="container">
        <Row align={"middle"} gutter={[10, 10]}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="participate__img">
              {isLoading || sectionData == undefined ? (
                <Skeleton.Image active width={566} height={337} />
              ) : (
                <Image
                  src={
                    sectionData ? sectionData?.image : "/home/participate1.webp"
                  }
                  alt="Border Rower"
                  fill
                  sizes="100vw"
                  ref={participateImg}
                />
              )}
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div
              className="text__wrapp participate__text-wrapp"
              ref={participateText}
            >
              {isLoading || sectionData == undefined ? (
                <Skeleton paragraph={{ rows: 5 }} active />
              ) : (
                <>
                  <Preheading
                    text={sectionData?.heading}
                    color={"text-primary"}
                  />
                  <CustomHeading
                    text={sectionData?.sub_heading}
                    color={"text-primary"}
                    weight={700}
                  />
                  <Paragraph
                    text={sectionData?.paragraph}
                    color={"text-primary"}
                  />
                  <Button
                    text={"Participate Now"}
                    isLight={false}
                    style={{ marginTop: "20px" }}
                    route={"/challenges"}
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Participate;
