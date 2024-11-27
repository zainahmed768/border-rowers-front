"use client";
import { Col, Pagination, Row, Skeleton } from "antd";
import {
  useChallengeContentQuery,
  useChallengeIntroQuery,
} from "../../features/api/GetChallengesApi";
import { Footer, Navbar } from "../../components";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
import Preheading from "../../components/Preheading";
import CustomHeading from "../../components/CustomHeading";
import Paragraph from "../../components/Paragraph";
import ChallengeCard from "../../components/Pages/Challenges/ChallengeCard/ChallengeCard";
import { useState } from "react";
import { PageMetas } from "../../utils/utils";

const Challenges = () => {
  // Stuff for Pagination Controls
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toolkit Imports
  const { data, isLoading } = useChallengeContentQuery({ page: page });
  const { data: challengeIntro } = useChallengeIntroQuery();
  let challangesData = data?.response?.data;
  let intro = challengeIntro?.response?.data;

  // For Page Meta
  const metaInfo = PageMetas("Challenges");
  return (
    <>
      <head>
        <title>
          {metaInfo?.meta_title ? metaInfo?.meta_title : "Border Rowers"}
        </title>
        <meta
          name="description"
          content={
            metaInfo?.meta_description
              ? metaInfo?.meta_description
              : "Border Rowers"
          }
        ></meta>
      </head>

      <Navbar isLight={true} />
      <InnerBanner title={"Challenges"} />
      <div className="container">
        <Row gutter={20} align={"middle"}>
          <Col lg={{ span: 11 }}>
            <Preheading text={intro?.heading} color={"text-primary"} />
            <CustomHeading
              text={intro?.sub_heading}
              color={"text-primary"}
              weight={700}
            />
          </Col>
          <Col lg={{ span: 2 }}></Col>
          <Col lg={{ span: 11 }}>
            <Paragraph text={intro?.paragraph} color={"text-primary"} />
          </Col>
        </Row>
        <div className="chllenge__cards-wrapp">
          <Row gutter={20}>
            {isLoading ? (
              [0, 0, 0, 0, 0, 0].map((_, i) => (
                <Col
                  key={i}
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Skeleton avatar active paragraph={{ rows: 3 }} />
                </Col>
              ))
            ) : challangesData?.data && challangesData?.data?.length > 0 ? (
              challangesData?.data?.map((card) => (
                <Col
                  key={card?.id}
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <ChallengeCard
                    by={card?.created_by}
                    title={card?.title}
                    startDate={card?.formated_start_date}
                    endDate={card?.formated_end_date}
                    date={card?.date}
                    desc={card?.description}
                    price={card?.charges}
                    isFree={card?.is_free}
                    isHard={card?.difficulty_level}
                    isSubscribed={card?.is_subscribed}
                    slug={card?.slug}
                    img={card?.cover_image_url}
                  />
                </Col>
              ))
            ) : (
              <Preheading
                text={"No Challenges Found"}
                color={"text-primary"}
                textAlign={"center"}
              />
            )}
          </Row>
        </div>
        <div
          style={{ maxWidth: "max-content", margin: "auto", padding: "4em 0" }}
        >
          <Pagination
            current={page}
            pageSize={challangesData?.per_page}
            onChange={handlePageChange}
            total={challangesData?.total}
            hideOnSinglePage
            responsive
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Challenges;
