"use client";
import { Col, Row, Skeleton, Spin } from "antd";
import "./index.css";
import Paragraph from "../../../Paragraph";
import Button from "../../../Button";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import PostCards from "./PostCards/PostCards";
import { useState } from "react";
import CommunityCard from "./CommunityCard/CommunityCard";
import { Power3, gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ModalPopup from "../../../ModalPopup/ModalPopup";
import { useGetHomeContentQuery } from "../../../../features/api/homeApi";
import { useChallengeContentQuery } from "../../../../features/api/GetChallengesApi";

gsap.registerPlugin(ScrollTrigger);

const RowingChallenges = () => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(2);
  // Toolkit
  const { data: challengeData, isLoading: challengeLoading } =
    useGetHomeContentQuery({
      section: "challenge_section",
    });
  const { data: communitySecData, isLoading: communityLoading } =
    useGetHomeContentQuery({
      section: "community_section",
    });
  const { data: challengeCardData, isLoading: challengeCardLoading } =
    useChallengeContentQuery();

  const challengeContent = challengeData?.response?.data;
  const communityContent = communitySecData?.response?.data;
  const slicedData = challengeCardData?.response?.data?.data?.slice(0, 4);
  console.log(communitySecData , 'challengeCardData')
  // Handlers
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Elements Refs
  const challenges = useRef();
  const topRow = useRef();
  const postCards = useRef();
  const cards = useRef();
  const communityText = useRef();

  // Gsap
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: challenges.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "restart none none none",
        },
      });
      // timeline.from(topRow.current.children, {
      //   opacity: 0,
      //   x: -100,
      //   stagger: 0.1,
      //   ease: Power3.ease,
      // });
      timeline.from(postCards.current, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
      });
      timeline.from(cards.current, {
        opacity: 0,
        y: 100,
        ease: Power3.ease,
      });
      timeline.from(communityText.current.children, {
        opacity: 0,
        y: 100,
        stagger: 0.05,
        ease: Power3.ease,
      });
    }, []);

    return () => ctx.revert();
  }, []);

  // styles
  const styles = {
    backdropFilter: "blur(10px)",
    background: "rgba(250, 250, 250, 0.1)",
    padding: "10px",
    borderRadius: "10px",
    margin: "10px 0",
  };

  return (
    <div className="rowing__challenges" ref={challenges}>
      <div className="container">
        <Row ref={topRow}>
          <Col lg={{ span: 10 }}>
            {/* {challengeLoading || challengeContent == undefined ? (
              <Skeleton active paragraph={{ rows: 0 }} style={styles} />
            ) : (
              <Preheading
                text={challengeContent?.heading}
                color={"text-white"}
              />
            )} */}
            {challengeLoading || challengeContent == undefined ? (
              <Skeleton active paragraph={{ rows: 1 }} style={styles} />
            ) : (
              <CustomHeading
                text={challengeContent?.sub_heading}
                color={"text-white"}
                weight={700}
              />
            )}
          </Col>
          <Col lg={{ span: 4 }}></Col>
          <Col lg={{ span: 10 }}>
            {challengeLoading || challengeContent == undefined ? (
              <Skeleton active paragraph={{ rows: 2 }} style={styles} />
            ) : (
              <Paragraph
                text={challengeContent?.paragraph}
                color={"text-white"}
              />
            )}
            <Button
              text={"View All Challenges"}
              isLight={false}
              style={{ marginTop: "20px" }}
              route={"/challenges"}
            />
          </Col>
        </Row>

        <div className="post__cards-wrapp" ref={postCards}>
          {challengeCardLoading ? (
            <Spin size="large" />
          ) : slicedData && slicedData.length > 0 ? (
            slicedData?.map((card, i) => (
              <PostCards
                key={i}
                id={card?.id}
                title={card?.title}
                postedBy={card?.created_by}
                endDate={card?.formated_end_date}
                startDate={card?.formated_start_date}
                description={card?.description}
                image={card?.cover_image_url}
                slug={card?.slug}
                active={active}
                handleClick={setActive}
                index={i}
              />
            ))
          ) : (
            // <Paragraph
            //   text={"No Free Challenges Found!"}
            //   color={"text-white"}
            //   textAlign={"center"}
            // />
            ""
          )}
        </div>

        <div className="community__wrapp">
          <Row gutter={50} align={"middle"}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              ref={cards}
            >
              {communityLoading || communityContent == undefined ? (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        avatar
                        paragraph={{ rows: 2 }}
                        key={i}
                        style={styles}
                        active
                      />
                    ))}
                </>
              ) : communityContent?.featured_challenges?.length > 0 ? (
                communityContent?.featured_challenges?.map((card, i) => (
                  <CommunityCard key={i} props={card} onClick={showModal} />
                ))
              ) : (
                <Preheading
                  text={"No Featured Challenges Found"}
                  color={"text-white"}
                />
              )}
            </Col>
            <Col lg={{ span: 12 }} ref={communityText}>
              {challengeLoading || challengeContent == undefined ? (
                <Skeleton paragraph={{ rows: 6 }} style={styles} active />
              ) : (
                <>
                  {/* <Preheading
                    text={communityContent?.heading}
                    color={"text-white"}
                  /> */}
                  <CustomHeading
                    text={communityContent?.sub_heading}
                    color={"text-white"}
                    weight={700}
                  />
                  <Paragraph
                    text={communityContent?.paragraph}
                    color={"text-white"}
                  />
                  <Button
                    text={"View Communities "}
                    isLight={false}
                    onClick={showModal}
                    style={{ marginTop: "30px" }}
                  />
                </>
              )}

              <ModalPopup
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                preHead="Download oUR application"
                heading="download Our application to get the most out of border rowers"
                para="Looking for a new and exciting way to stay active and challenge yourself? Download our rowing application today and join a community of rowers from around the world who are passionate about indoor rowing!"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RowingChallenges;
