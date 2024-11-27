"use client";
import { Col, Modal, Row, Skeleton } from "antd";
import Image from "next/image";
import Preheading from "../../../Preheading";
import Paragraph from "../../../Paragraph";
import Button from "../../../Button";
import { LeaderboardCard } from "../../..";
import { Typography } from "antd";
import "./Banner.css";
import { Power4, gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";


const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toolkit
  const { data, isLoading, refetch } = useGetHomeContentQuery({
    section: "home_one",
  });
  const bannerData = data?.response?.data;
  const checkLogin = JSON.parse(
    localStorage.getItem("persist:root")
  ).isLoggedIn;
  console.log(checkLogin, "checkLogin");

  const handleModalClose = () => {
    console.log("modal close");
    setIsModalOpen(false);
    localStorage.setItem("modal", false);
  };
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    let check = localStorage.getItem("modal");
    console.log(check !== false, "sjdvsdjvn");
    if (check === "true") {
    setIsModalOpen(true);
    }
  }, [checkLogin]);
  // Element Refs
  const bannerText = useRef();
  const rowers = useRef();
  const leaderBoarCards = useRef();
  const bannerImages = useRef();
  const leaderHead = useRef();

  // Gsap
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap
        .timeline({})
        .from(bannerText.current.children, {
          x: -200,
          opacity: 0,
          stagger: 0.2,
        })
        .from(rowers.current.children, {
          x: -200,
          opacity: 0,
          stagger: 0.2,
        })
        .from(leaderHead.current, {
          x: -200,
          opacity: 0,
        })
        .from(leaderBoarCards.current.children, {
          x: -200,
          opacity: 0,
          stagger: 0.2,
        })
        .from(bannerImages.current.children[0], {
          y: -100,
          opacity: 0,
          ease: Power4.ease,
        })
        .from(bannerImages.current.children[1], {
          x: 200,
          opacity: 0,
          ease: Power4.ease,
        })
        .from(bannerImages.current.children[2], {
          scale: 0,
          opacity: 0,
          ease: Power4.ease,
        });
    }, []);

    return () => ctx.revert();
  }, []);
  // Gsap
  const handleBeginClick = () => {
    localStorage.setItem("modal", "false"); // Set to false before navigating
    setIsModalOpen(false);
    router.push("/challenges"); // Redirect to the desired route
  };

  return (
    <>
      <div className="banner">
        <div className="container">
          <Row align={"middle"}>
            <Col lg={{ span: 12 }}>
              <div className="banner__matter">
                <div className="banner__text-wrapp" ref={bannerText}>
                  {isLoading || bannerData == undefined ? (
                    <Skeleton active paragraph={{ rows: 5 }} />
                  ) : (
                    <>
                      <Preheading
                        text={bannerData?.heading}
                        color="text-white"
                      />
                      <div
                        className="text-white banner__heading"
                        dangerouslySetInnerHTML={{
                          __html: bannerData?.content,
                        }}
                      ></div>
                      {/* <Typography.Title className="text-white big banner__heading">
                      Connect with people &nbsp;
                      <Image
                        src={"/home/peoples.png"}
                        width={85}
                        height={53}
                        alt="Border Rowers"
                      />
                      around the
                      <Image
                        src={"/home/globe.png"}
                        width={70}
                        height={70}
                        alt="Border Rowers"
                      />
                      world for rowing challenges
                    </Typography.Title> */}
                      <Paragraph
                        text={bannerData?.paragraph}
                        color="text-white"
                      />
                    </>
                  )}
                </div>
                {/* Rowers  */}
                <Row align={"middle"} ref={rowers} gutter={10}>
                  <Col lg={{ span: 12 }} xs={{ span: 24 }}>
                    <Button
                      text={"Participate in Challenge"}
                      isLight={true}
                      route={"/challenges"}
                    />
                  </Col>
                  <Col lg={{ span: 1 }} xs={{ span: 0 }}>
                    <div
                      style={{
                        height: "50px",
                        width: "1px",
                        backgroundColor: "#fff",
                        margin: "auto",
                      }}
                    ></div>
                  </Col>
                  <Col lg={{ span: 11 }} xs={{ span: 24 }}>
                    <div className="banner__customers">
                      {bannerData?.rowers_images?.slice(0, 4)?.map((_, i) => (
                        <Image
                          key={i}
                          src={_?.[0]}
                          width={46}
                          height={46}
                          alt="Border Rowers"
                          style={{
                            borderRadius: "50%",
                            border: "2px solid #fff",
                          }}
                        />
                      ))}
                      <div>
                        <p>More Than {bannerData?.total_rowers}</p>
                        <p className="normal">
                          <strong>happy Rowers</strong>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* Rowers  */}
                <div className="leaderboards">
                  <div className="leader__head" ref={leaderHead}>
                    {bannerData?.leaderboard?.length > 0 && (
                      <Preheading
                        text="Rowers of the Month"
                        color="text-white"
                        weight={600}
                      />
                    )}
                  </div>
                  <div className="leaderBoarCards">
                    <Row gutter={15} ref={leaderBoarCards}>
                      {isLoading ? (
                        Array(bannerData?.leaderboard?.length)
                          .fill(0)
                          ?.map((_, i) => <Skeleton active key={i} />)
                      ) : (
                        <>
                          {bannerData ? (
                            bannerData?.leaderboard?.map((card, i) => (
                              <Col
                                lg={{ span: 6 }}
                                md={{ span: 6 }}
                                sm={{ span: 8 }}
                                xs={{ span: 24 }}
                                key={i}
                              >
                                <LeaderboardCard
                                  id={card?.user_id}
                                  image={card?.image_url}
                                  position={card?.position}
                                  name={card?.title}
                                  score={card?.covered_area}
                                />
                              </Col>
                            ))
                          ) : (
                            <Paragraph
                              text={"Not Found"}
                              color={"text-white"}
                            />
                          )}
                        </>
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={{ span: 12 }}>
              <div className="banner__images" ref={bannerImages}>
                <Image
                  src={"/home/bannerr-bg.png"}
                  alt="Border Rower"
                  fill
                  sizes="100vw"
                  className="banner-bg"
                />
                <div className="banner__img-wrapp">
                  {isLoading ? (
                    <Skeleton avatar />
                  ) : (
                    <Image
                      src={bannerData?.image}
                      alt="Border Rower"
                      fill
                      style={{ objectFit: "cover" }}
                      className="banner-img"
                      sizes="100vw"
                    />
                  )}
                </div>
                <Image
                  src={"/home/progress_thumb.png"}
                  alt="Border Rower"
                  width={249}
                  height={184}
                  style={{ objectFit: "cover" }}
                  className="progress-img"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        footer={null}
        className="welcome-modal"
        onCancel={handleModalClose}
      >
        <div className="modal-wrap">
          <div className="text-center">
            <Preheading
              text={"Welcome We’re so excited to have you here!"}
              textAlign={"center"}
            />
            <Paragraph
              text={
                "To kick things off, we’re giving you your first challenge on us!"
              }
              textAlign={"center"}
              margin={0}
              weight={400}
            />
            <Paragraph
              text={
                "Dive in, explore, and start experiencing all that Border Rowers has to offer."
              }
              textAlign={"center"}
              margin={0}
              weight={400}
            />
            <div
              className="btn-wrap text-center"
              style={{ paddingTop: "20px" }}
              onClick={handleBeginClick}
            >
              <Button
                text={"Ready to begin?"}
                isLight={false}
                style={{
                  textAlign: "center",
                  margin: "0px auto",
                }}

                // route={"/challenges"}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Banner;
