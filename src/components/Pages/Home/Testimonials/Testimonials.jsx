"use client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import Slider from "react-slick";
import { Col, Row, Skeleton } from "antd";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import { Power3, gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  // States
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // Toolkit
  const { data, isLoading } = useGetHomeContentQuery({
    section: "testimonial",
  });
  const testimonialsData = data?.response?.data;
  // Element Refs
  const testimonials = useRef();
  const textWrapp = useRef();
  const textWrappTwo = useRef();
  const navs = useRef();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  //  Gsap
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: testimonials.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "restart none none none",
        },
      });
      timeline.from(textWrapp.current, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
      });
      timeline.from(textWrappTwo.current.children, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
        scrub: true,
        stagger: 0.2,
      });
      timeline.from(navs.current.children, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
      });
    }, []);

    return () => ctx.revert();
  }, []);

  const Testimoni = ({ image, name, desig, desc }) => {
    return (
      <div className="testimoni__wrapp">
        <Image
          src={"/home/quote.svg"}
          alt="Border rower"
          width={25}
          height={18}
          className="quote__top"
        />
        <Paragraph text={desc} color={"text-primary"} />
        <Image
          src={"/home/quote.svg"}
          alt="Border rower"
          width={25}
          height={18}
          className="quote__bottom"
        />
        <div className="reviewer">
          <Image
            src={image}
            alt="Border Rower"
            width={56}
            height={56}
            style={{ borderRadius: "50%" }}
          />
          <div className="review__info">
            <h5>{name}</h5>
            <p>{desig}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="testimonials__sec" ref={testimonials}>
      <div className="container">
        <div className="testimonies__wrapp">
          <Row ref={textWrapp}>
            <Col lg={{ span: 8 }}>
              {isLoading || testimonialsData == undefined ? (
                <Skeleton paragraph={{ rows: 3 }} />
              ) : !testimonialsData?.testimonials?.length > 0 ? (
                ""
              ) : (
                <>
                  <Preheading
                    text={testimonialsData?.heading}
                    color={"text-primary"}
                  />
                  <CustomHeading
                    text={testimonialsData?.sub_heading}
                    color={"text-primary"}
                    weight={700}
                  />
                </>
              )}
            </Col>
          </Row>
          <Row gutter={30}>
            <Col lg={{ span: 12 }} ref={textWrappTwo}>
              {testimonialsData?.testimonials?.length > 0 ? (
                <div className="testi__main">
                  <Slider
                    ref={slider1}
                    arrows={false}
                    swipeToSlide={true}
                    dots={true}
                    infinite={true}
                    beforeChange={(oldIndex, newIndex) =>
                      slider2.current.slickGoTo(newIndex)
                    }
                  >
                    {testimonialsData?.testimonials?.map((_, i) => (
                      <Testimoni
                        key={i}
                        name={_?.name}
                        desig={_?.designation}
                        image={_?.image_url}
                        desc={_?.comment}
                      />
                    ))}
                  </Slider>
                </div>
              ) : (
                <Paragraph text={""} color={"text-primary"} />
              )}
            </Col>
            <Col lg={{ span: 12 }} className="slider__nav-wrap">
              <div className="slider__nav" ref={navs}>
                <Slider
                  ref={slider2}
                  slidesToShow={3}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  dots={true}
                  arrows={false}
                  centerMode={
                    testimonialsData?.testimonials?.length > 2 ? true : false
                  }
                  beforeChange={(oldIndex, newIndex) =>
                    slider1.current.slickGoTo(newIndex)
                  }
                >
                  {testimonialsData?.testimonials?.map((_, i) => (
                    <div className="sync__nav" key={i}>
                      <Image
                        src={_?.image_url}
                        alt="Border Rower"
                        fill
                        sizes="100vw"
                        style={{ borderRadius: "28px" }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
