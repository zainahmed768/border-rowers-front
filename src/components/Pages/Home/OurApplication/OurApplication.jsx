"use client";
import { Col, Row, Skeleton } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import { Power3, gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import DownloadButtons from "../../../DownloadButtons/DownloadButtons";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";

gsap.registerPlugin(ScrollTrigger);

const OurApplication = () => {
  // Toolkit
  const { data, isLoading, refetch } = useGetHomeContentQuery({
    section: "application_section",
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  const sectionData = data?.response?.data;
  // Element Refs
  const app = useRef();
  const phoneImg = useRef();
  const textWrapp = useRef();

  // GSAP
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: app.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "restart none none none",
        },
      });
      timeline.from(phoneImg.current, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
        scrub: true,
      });
      timeline.from(textWrapp.current.children, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
        stagger: 0.1,
      });
    }, []);

    return () => ctx.revert();
  }, []);
  return (
    <div className="our__application" ref={app}>
      <div className="container">
        <Row gutter={30} align={"bottom"}>
          <Col lg={{ span: 12 }} ref={textWrapp}>
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
                <DownloadButtons />
              </>
            )}
          </Col>
          <Col lg={{ span: 12 }} ref={phoneImg}>
            <div className="application__img">
              {isLoading || sectionData == undefined ? (
                <Skeleton.Image />
              ) : (
                <Image
                  src={sectionData?.image}
                  fill
                  sizes="100vw"
                  alt="Border Rower"
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OurApplication;
