"use client";
import { Col, Row, Skeleton } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Button from "../../../Button";
import Image from "next/image";
import { Power3, gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { PauseOutlined } from "@ant-design/icons";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  // States
  const [videoToggle, setVideoToggle] = useState(false);

  // Toolkit
  const { data, isLoading } = useGetHomeContentQuery({
    section: "expert_message_section",
  });
  const sectionData = data?.response?.data;
  // Handlers
  const handleVideoToggle = () => {
    setVideoToggle((prevToggle) => !prevToggle);

    const video = vidRef.current.children[1];

    if (!videoToggle) {
      video.play();
    } else {
      video.pause();
    }
  };

  // Element Refs
  const expertise = useRef();
  const vidRef = useRef();
  const textWrapp = useRef();

  // Gsap
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: expertise.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "restart none none none",
        },
      });
      timeline.from(vidRef.current, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
        scrub: true,
      });
      timeline.from(textWrapp.current.children, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
        scrub: true,
        stagger: 0.2,
      });
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <div className="expertise" ref={expertise}>
      <div className="container">
        <Row align={"middle"} gutter={[25, 25]}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="expertise__video" ref={vidRef}>
              <div className="play__icon" onClick={handleVideoToggle}>
                {videoToggle ? (
                  <PauseOutlined style={{ fontSize: "40px" }} />
                ) : (
                  <Image
                    src={"/home/playVid.svg"}
                    alt="Border Rower"
                    width={38}
                    height={49}
                  />
                )}
              </div>
              <video
                src={sectionData?.video}
                // poster={"/home/expert.webp"}
              ></video>
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            ref={textWrapp}
          >
            {isLoading || sectionData == undefined ? (
              <Skeleton paragraph={{ rows: 6 }} />
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
                  text={"Learn More"}
                  isLight={false}
                  style={{ marginTop: "20px" }}
                  route={"/about-us"}
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Expertise;
