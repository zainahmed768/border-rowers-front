"use client";

import {
  Col,
  Progress,
  Row,
  Skeleton,
  Spin,
  Tag,
  notification,
  Space,
} from "antd";
import UserLayout from "../../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import DashboardTitle from "../../../../components/Dashboards/DashboardTitle";
import Paragraph from "../../../../components/Paragraph";
import Preheading from "../../../../components/Preheading";
import "../../../../pages/User/MyChallenges/ChallengeSingle/index.css";
import CountUp from "react-countup";
import Image from "next/image";
import { DetailBox } from "../../../../components/Pages/RiverChallenge/ChallengeDetails/ChallengeDetails";
import Link from "next/link";
import { Navbar } from "../../../../components";
import {
  useGetSingleChallengeQuery,
  useLazyDropUserChallengeQuery,
} from "../../../../features/api/GetChallengesApi";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeftOutlined } from "@ant-design/icons";
import ChallengeTrophyCard from "../../../../components/Dashboards/ChallengeTrophyCard/ChallengeTrophyCard";
import FlipCard from "../../../../components/FlipCard/FlipCard";
import { useEffect } from "react";

const ChallengeSingle = () => {
  const router = useRouter();
  const { challenge } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const { data, isLoading, refetch } = useGetSingleChallengeQuery(challenge);
  useEffect(() => {
    refetch();
  }, []);
  // const [
  //   trigger,
  //   {
  //     isLoading: dropChallengeLoading,
  //     error,
  //     data: dropChallengeData,
  //     isSuccess,
  //   },
  // ] = useLazyDropUserChallengeQuery();
  const challengeData = data?.response?.data;
  // console.log(challengeData, "challenge data");
  // handeling dropchallenge responses
  // useEffect(() => {
  //   if (isSuccess) {
  //     api.info({
  //       message: `Notification`,
  //       description: (
  //         <Paragraph text={dropChallengeData?.message} color={"text-primary"} />
  //       ),
  //       placement: "top",
  //       duration: 2,
  //     });

  //     setTimeout(() => {
  //       router.back();
  //     }, 2000);
  //   }
  // }, [isSuccess]);
  return (
    <>
      {contextHolder}
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        <Row align={"middle"}>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <ArrowLeftOutlined
              style={{
                fontSize: "30px",
                color: "var(--primary-color)",
                cursor: "pointer",
                margin: "0 0 10px",
              }}
              onClick={() => router.back()}
            />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <DashboardTitle title={"My Challenges"} />
            <Paragraph
              text={challengeData?.created_by || "Organization/Admin"}
              color={"text-secondary"}
              margin={0}
            />
            <Preheading
              text={challengeData?.challenge_title || "Challenge Title"}
              textTransform={"capitalize"}
              weight={700}
              margin={0}
              color={"text-primary"}
            />
            <Paragraph
              size
              text={`${challengeData?.formated_start_date || "Start Date"} to ${challengeData?.formated_end_date || "End Date"}`}
              color={"text-primary"}
              margin={0}
            />
            <br />
            <Preheading
              text={"About Challenge"}
              textTransform={"capitalize"}
              weight={700}
              color={"text-primary"}
            />
            <Paragraph
              size
              text={
                challengeData?.description == "undefined"
                  ? "No Description Added!"
                  : challengeData?.description ||
                    "Challenge Description Goes Here"
              }
              color={"text-primary"}
              margin={0}
            />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            {/* <div className="river__challenge-map"> */}
            {isLoading ? (
              <Skeleton.Image active />
            ) : (
              <Image
                src={challengeData?.cover_image_url || "/challenge-image.png"}
                height={166}
                width={380}
                alt="Border Rower"
                style={{ objectFit: "cover", borderRadius: "20px" }}
              />
            )}
            {/* </div> */}
            <Row gutter={5}>
              <DetailBox
                title={"Start Date"}
                data={challengeData?.formated_start_date || "Start Date"}
                grid={8}
              />
              <DetailBox
                title={"End Date"}
                data={challengeData?.formated_end_date || "End Date"}
                grid={8}
              />
              <DetailBox
                title={"Total Meters"}
                data={`${challengeData?.distance || 0}`}
                grid={8}
              />
            </Row>
          </Col>
        </Row>
        <Row gutter={20} align={"middle"} style={{ marginTop: "1rem" }}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="participants">
              <div className="participant__wrap">
                <div className="participant__img">
                  {isLoading ? (
                    <Spin />
                  ) : challengeData?.active_participants_images ? (
                    challengeData?.active_participants_images
                      ?.slice(0, 2)
                      ?.filter((_) => _ !== null)
                      ?.map((_, i) => (
                        <Image
                          key={i}
                          height={77}
                          width={77}
                          alt="Border Rowers"
                          src={_}
                          style={{
                            borderRadius: "50%",
                            marginLeft: "-10px",
                            border: "4px solid #fff",
                          }}
                        />
                      ))
                  ) : (
                    <Image
                      src={"/participants.png"}
                      alt="Border Rowers"
                      fill
                      sizes="100vw"
                    />
                  )}
                </div>
                <div className="participant__info">
                  <h4 className="totals">
                    total{" "}
                    <CountUp
                      start={0}
                      end={challengeData?.active_participants_count || 0}
                      duration={3}
                    />
                  </h4>
                  <h5 className="totals">Active Participants </h5>
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Row align={"middle"} style={{ marginTop: "1rem" }}>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <Paragraph
                  text={"Challenge Fee "}
                  margin={0}
                  color={"text-primary"}
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
                style={{ textAlign: "right" }}
              >
                <Tag color="#F6CD3B" className="tag__label">
                  ${challengeData?.charges || 0}
                </Tag>
              </Col>
            </Row>
            <Row align={"middle"} style={{ marginTop: "1rem" }}>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <Paragraph
                  text={"Challenge Status "}
                  margin={0}
                  color={"text-primary"}
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
                style={{ textAlign: "right" }}
              >
                <Tag color="#55F63B" className="tag__label">
                  {challengeData?.subscription_status || ""}
                </Tag>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="rules">
          <Preheading
            text={"Rules & Guidelines"}
            weight={700}
            color={"text-primary"}
            margin={"20px 0 "}
          />
          <Row gutter={20}>
            {challengeData?.rules_guidelines?.map((rule, i) => (
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={i}
              >
                <Paragraph text={rule} color={"text-primary"} />
              </Col>
            ))}
            {/* <Paragraph
              text={challengeData?.rules_guidelines || "Rules & Guidelines"}
              color={"text-primary"}
            /> */}
          </Row>
        </div>
        <Row gutter={[20, 20]}>
          {/* <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="user__acheivements"
          > */}
          {/* {challengeData?.team && (
              <>
                <Row align={"middle"}>
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 12 }}
                  >
                    <Preheading
                      text={"My Team"}
                      weight={700}
                      color={"text-primary"}
                      margin={0}
                    />
                  </Col>
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 12 }}
                    style={{ textAlign: "right" }}
                  >
                    <Link
                      href={"/user/my-team/as-captian"}
                      className="text-secondary"
                    >
                      View Team
                    </Link>
                  </Col>
                </Row>
                <TeamBadhge
                  image={"/my-team/team-logo.png"}
                  name={"The Real Rowers"}
                  members={"04"}
                />
                <Row gutter={[10, 10]}>
                  <Members
                    image={"/my-team/my-team1.png"}
                    name={"Barbara Hogan"}
                    score={"32,216,008"}
                  />
                  <Members
                    image={"/my-team/my-team2.png"}
                    name={"Barbara Hogan"}
                    score={"32,216,008"}
                  />
                  <Members
                    image={"/my-team/my-team3.png"}
                    name={"Barbara Hogan"}
                    score={"32,216,008"}
                  />
                  <Members
                    image={"/my-team/my-team4.png"}
                    name={"Barbara Hogan"}
                    score={"32,216,008"}
                  />
                </Row>
              </>
            )} */}
          {/* <Preheading
              text={"My Acheivements"}
              weight={700}
              color={"text-primary"}
              margin={0}
            />
            <Preheading
              text={"Trophies"}
              textTransform={"capitalize"}
              weight={700}
              color={"text-primary"}
            />
            {challengeData?.["achievements "]?.trophies?.map((_) => (
              <ChallengeTrophyCard
                key={_?.id}
                src={_?.image_url}
                title={_?.title}
                distance={`${_?.distance} Meters`}
                frequency={`Every ${_?.frequency} Hours`}
                time={`${_?.time} Days in a Row`}
              />
            ))}
            <Preheading
              text={"Postcards"}
              textTransform={"capitalize"}
              weight={700}
              color={"text-primary"}
            />
            {challengeData?.["achievements "]?.postcards?.map((_) => (
              <FlipCard
                key={_?.id !== null ? _?.id : 0}
                title={_?.title !== null ? _?.title : "Title"}
                description={
                  _?.description !== null ? _?.description : "description"
                }
                distance={_?.milestone !== null ? _?.milestone : 0}
                frontImage={
                  _?.image_url_front !== null
                    ? _?.image_url_front
                    : "/challenge-image.png"
                }
              />
            ))}
          </Col> */}
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading
              text={"Challenge Details"}
              weight={700}
              color={"text-primary"}
              margin={0}
            />
            <Row gutter={[10, 10]} style={{ marginTop: "1rem" }}>
              <DetailTag
                label={"Total Miles:"}
                detail={challengeData?.meters_covered || 0}
              />
              {/* <DetailTag
                label={"No of Rows:"}
                detail={challengeData?.total_rowing || 0}
              /> */}
              <DetailTag
                label={"Positions:"}
                detail={challengeData?.positions || 0}
              />
              <DetailTag
                label={"Speed MPH:"}
                detail={challengeData?.speed || 0}
              />
            </Row>
            <Row
              gutter={[10, 10]}
              style={{ marginTop: "1.5rem", width: "100%" }}
            >
              {/* <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Paragraph
                  text={`Rowing : ${challengeData?.row_total_rowing || 0}`}
                  color={"text-primary"}
                  size
                />
                <Progress
                  percent={challengeData?.row_total_rowing / 100}
                  size={[150, 30]}
                  showInfo={false}
                  strokeColor={"#F6CD3B"}
                  trailColor={"#fff"}
                  strokeLinecap={"see"}
                  className={"challenge__progress"}
                />
              </Col> */}
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Paragraph
                  text={`Meters Covered : ${challengeData?.row_meters_covered || 0}`}
                  color={"text-primary"}
                  size
                />
                <Space direction="vertical">
                  <Progress
                    percent={
                      (challengeData?.row_meters_covered /
                        challengeData?.distance) *
                      100
                    }
                    size={[150, 30]}
                    showInfo={false}
                    strokeColor={"#193A69"}
                    trailColor={"#fff"}
                    strokeLinecap={"see"}
                    className={"challenge__progress"}
                  />
                  {challengeData?.row_meters_covered >=
                    challengeData?.distance && (
                    <Paragraph text={"Total Meters Acheived!"} size />
                  )}
                </Space>
              </Col>
            </Row>
          </Col>
          {/* <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <button
              className="cancle__btn"
              onClick={() => trigger(challengeData?.id)}
            >
              {dropChallengeLoading ? <Spin /> : "Cancle Challenge"}
            </button>
          </Col> */}
        </Row>
      </UserLayout>
    </>
  );
};

export default ChallengeSingle;

const DetailTag = ({ label, detail }) => {
  return (
    <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
      <div className="detail__tag">
        <Paragraph size text={label} margin={0} color={"text-primary"} />
        <Tag color="#193A69">{detail}</Tag>
      </div>
    </Col>
  );
};

const TeamBadhge = ({ image, name, members }) => {
  return (
    <div className="team-badge">
      <div className="team-logo">
        <Image src={image} alt="Border Rowers" width={60} height={60} />
      </div>
      <div className="team-name">
        <Preheading
          text={name}
          weight={700}
          color={"text-primary"}
          margin={"20px 0 "}
        />
      </div>
      <div className="team-info">
        <Paragraph
          text={`Member: ${members}`}
          color={"text-primary"}
          margin={0}
          size
        />
      </div>
    </div>
  );
};

const Members = ({ image, name, score }) => {
  return (
    <Col
      lg={{ span: 12 }}
      md={{ span: 24 }}
      sm={{ span: 24 }}
      xs={{ span: 24 }}
    >
      <div className="members">
        <Image src={image} alt="Border Rowers" width={50} height={50} />
        <div className="nameScore">
          <h4>{name}</h4>
          <h5>{score}</h5>
        </div>
      </div>
    </Col>
  );
};
