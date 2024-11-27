"use client";
import { Col, Row, Skeleton } from "antd";
import "./index.css";
import Image from "next/image";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import "../../Home/Expertise/index.css";

import { useRef, useState } from "react";
import { PauseOutlined } from "@ant-design/icons";
import { useGetAboutContentQuery } from "../../../../features/api/aboutApi";

const FamousRowChallenge = () => {
  // States
  const [videoToggle, setVideoToggle] = useState(false);

  // Toolkit
  const { data, isLoading } = useGetAboutContentQuery({
    section: "about_three",
  });
  const aboutThree = data?.response?.data;

  // Element Refs
  const vidRef = useRef();

  // Handlers
  const handleVideoToggle = () => {
    setVideoToggle((prevToggle) => !prevToggle);
    const video = vidRef.current;
    if (!videoToggle) {
      video.play();
    } else {
      video.pause();
    }
  };
  return (
    <div className="famouseRowChallenge">
      <div className="container">
        <Row align={"middle"} gutter={[20, 20]}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            {isLoading || aboutThree == undefined ? (
              <Skeleton active paragrap={{ rows: 5 }} />
            ) : (
              <>
                <Preheading text={aboutThree?.heading} color={"text-primary"} />
                <CustomHeading
                  text={aboutThree?.sub_heading}
                  color={"text-primary"}
                  weight={700}
                />
                <Paragraph
                  text={aboutThree?.paragraph}
                  color={"text-primary"}
                />
              </>
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="expertise__video">
              {/* <div className="play__icon" onClick={handleVideoToggle}>
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
                src={aboutThree?.video}
                // poster={"/home/expert.webp"}
                ref={vidRef}
              ></video> */}
              <iframe
                width="100%"
                height="300"
                src={aboutThree?.video}
                title="The Row Around the World"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FamousRowChallenge;
