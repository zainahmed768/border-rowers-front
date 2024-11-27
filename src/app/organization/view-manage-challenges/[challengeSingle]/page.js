"use client";
import { Col, Modal, Row, Space, Spin, notification } from "antd";
import AdminLayout from "../../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import DashboardTitle from "../../../../components/Dashboards/DashboardTitle";
import SubTitle from "../../../../components/SubTitle/SubTitle";
import ThemeButton from "../../../../components/ThemeButton/ThemeButton";
import Paragraph from "../../../../components/Paragraph";
import Image from "next/image";
import SelfImage from "../../../../components/SelfImage/SelfImage";
import "../../../../pages/Organization/ViewManage/ChallengeSingle/index.css";
import { DetailBox } from "../../../../components/Pages/RiverChallenge/ChallengeDetails/ChallengeDetails";
import InputDuration from "../../../../components/Dashboards/InputDuration/InputDuration";
import { Navbar } from "../../../../components";
import ChallengeTrophyCard from "../../../../components/Dashboards/ChallengeTrophyCard/ChallengeTrophyCard";
import FlipCard from "../../../../components/FlipCard/FlipCard";
import { useParams, useRouter } from "next/navigation";
import {
  useDeleteChallengeMutation,
  useViewChallengeQuery,
} from "../../../../features/api/OrganizationApi";
import moment from "moment";
import { useEffect, useState } from "react";
import Preheading from "../../../../components/Preheading";
import Button from "../../../../components/Button";
// import ShowMap from "../../../../components/ShowMap/ShowMap";

const ChallengeSingle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let { challengeSingle } = useParams();
  const { data, isLoading, refetch } = useViewChallengeQuery(challengeSingle);
  const challenge = data?.response?.data;
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Setting challenge Details to Local Storage to show in Edit Challenge
  typeof window !== undefined
    ? localStorage?.setItem(
        "manage_challenge_details",
        JSON.stringify(challenge)
      )
    : null;
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  const [
    deleteChallenge,
    { isLoading: loadingDeleteItem, error, isSuccess, data: deletionData },
  ] = useDeleteChallengeMutation();

  const router = useRouter();

  const viewManageChallengeData = [
    {
      label: "Title",
      value: challenge?.title,
    },
    {
      label: "Total Meters",
      value: challenge?.distance,
    },
    {
      label: "Difficulty level",
      value: challenge?.difficulty_level,
    },
    {
      label: "Status",
      value: challenge?.challenge_status,
    },
    {
      label: "Pricing",
      value: `$${challenge?.charges}`,
    },
    {
      label: "Total Members",
      value: challenge?.max_member_allowed_in_team,
    },
  ];

  const handleDelete = async (id) => {
    try {
      await deleteChallenge(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      if (deletionData?.status == false) {
        api.info({
          message: `Notification`,
          description: (
            <Paragraph text={deletionData?.message} color={"text-primary"} />
          ),
          placement: "top",
          duration: 2,
        });
      }
      if (deletionData?.status == true) {
        api.info({
          message: `Notification`,
          description: (
            <Paragraph
              text={"Challenge Deleted Successfully"}
              color={"text-primary"}
            />
          ),
          placement: "top",
          duration: 2,
        });

        setTimeout(() => {
          !isLoading && router.back();
        }, 1500);
      }
    }
  }, [isSuccess]);

  // Date Difference
  const startDate = moment(challenge?.start_date);
  const endDate = moment(challenge?.end_date);

  let challengeDays;
  let challengeHours;
  let challengeMinutes;
  let challengeSeconds;
  if (startDate && endDate) {
    challengeDays = endDate.diff(startDate, "days");
    challengeHours = endDate.diff(startDate, "hours") / 60;
    challengeMinutes = endDate.diff(startDate, "minutes") / 60;
    challengeSeconds = Math.floor(endDate.diff(startDate, "seconds") / 1000);
  }

  // To show countdown Timer
  // const [countdown, setCountdown] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });

  // useEffect(() => {
  //   let countdownInterval = null;

  //   const updateCountdown = () => {
  //     const now = moment();
  //     const remainingTime = moment.duration(endDate.diff(now));
  //     setCountdown({
  //       days: remainingTime.days(),
  //       hours: remainingTime.hours(),
  //       minutes: remainingTime.minutes(),
  //       seconds: remainingTime.seconds(),
  //     });
  //     if (remainingTime.asSeconds() <= 0) {
  //       clearInterval(countdownInterval);
  //     }
  //   };

  //   updateCountdown();
  //   countdownInterval = setInterval(updateCountdown, 1000);

  //   return () => clearInterval(countdownInterval);
  // }, [endDate]);
  const currDate = new Date();
  return (
    <>
      {contextHolder}
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <Row>
          <Col
            lg={{ span: 16 }}
            md={{ span: 16 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <DashboardTitle title={"Organization  Dashboard"} />
          </Col>
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Row align={"middle"} gutter={10} justify={"end"}>
              {/* <Col>
                <ShareButton />
              </Col> */}
              <Col>
                <ThemeButton
                  text={"Edit Details"}
                  route={`/organization/view-manage-challenges/${challenge?.id}/edit`}
                  // disabled={
                  //   currDate > new Date(challenge?.start_date) ? true : false
                  // }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <SubTitle title={"View & Manage Challenges"} />
        <Row gutter={20}>
          {isLoading ? (
            <Spin />
          ) : viewManageChallengeData && viewManageChallengeData.length > 0 ? (
            viewManageChallengeData?.map((info, i) => (
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={i}
              >
                <Row gutter={30}>
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 12 }}
                  >
                    <Paragraph
                      text={info?.label}
                      color={"text-third"}
                      weight={500}
                      margin={"10px 0"}
                    />
                  </Col>
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 12 }}
                    style={{ textAlign: "right" }}
                  >
                    <Paragraph
                      text={info?.value}
                      color={"text-third"}
                      weight={500}
                      margin={"10px 0"}
                    />
                  </Col>
                </Row>
              </Col>
            ))
          ) : (
            "No Information Found"
          )}
        </Row>
        <Row gutter={30} align={"bottom"}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Paragraph
              text={"Challenge Image"}
              color={"text-third"}
              weight={500}
            />
            {isLoading ? (
              <Spin />
            ) : (
              <Image
                src={challenge?.cover_image_url}
                alt="Border Rowers"
                width={213}
                height={125}
                style={{ objectFit: "contain" }}
              />
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="map__img-wrapp"
          >
            {/* {challenge?.route ? (
              <ShowMap
                routes={challenge?.route}
                slug={challenge?.slug}
                style={{ width: "100%", height: "200px", borderRadius : '20px', outline : 'none' }}
              />
            ) : (
              <SelfImage src={"/challenge-map.png"} />
            )} */}
            <SelfImage src={"/challenge_map.png"} />
          </Col>
        </Row>
        <Row gutter={20}>
          {/* *************************************************** */}
          {/* Commenting this peice of code for feedback purpose  */}
          {/* *************************************************** */}
          {/* <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          > */}

          {/* <Paragraph text={"Postcards"} color={"text-third"} weight={500} /> */}
          {/* old one  */}
          {/* <Acheivements
              src={"/trophy-icon.svg"}
              title={"Rowing King"}
              para={
                "Lorem ipsum dolor sit amet, consectetur adipisc ing elit, sed do eiusmod tempor"
              }
              level={"Easy"}
              miles={"6421 | 2.5 mi"}
            /> */}
          {/* old one  */}
          {/* {challenge?.postcards && challenge?.postcards?.length > 0
              ? challenge?.postcards.map((_, i) => {
                  return (
                    <FlipCard
                      key={i}
                      title={_?.title}
                      description={_?.description}
                      // mileston={_?.milestone}
                      distance={_?.milestone}
                      frontImage={_?.image_url_front}
                      backImage={_?.image_url_back}
                      isOrg={true}
                      // isPublic={true}
                    />
                  );
                })
              : "No Postcards"}
          </Col> */}
          {/* <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="trophies__col"
          >
            <Paragraph text={"Trophies"} color={"text-third"} weight={500} /> */}
          {/* old one  */}
          {/* <Trophy src={"/trophy.png"} width={85} height={106} /> */}
          {/* old one  */}
          {/* {challenge?.trophies && challenge?.trophies?.length > 0
              ? challenge?.trophies?.map((_, i) => (
                  <ChallengeTrophyCard
                    key={i}
                    src={_?.image_url}
                    title={_?.title}
                    distance={`${_?.distance} Meters`}
                    frequency={`Every ${_?.frequency} Hours`}
                    time={`${_?.time} Days in a Row`}
                  />
                ))
              : "No Trophies Found"}
          </Col> */}
        </Row>
        {/* <Row gutter={20} align={"bottom"} style={{ marginTop: "1rem" }}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Paragraph text={"Milestones"} color={"text-third"} weight={500} />
            <Paragraph
              size
              text={"1st Mile Stone"}
              color={"text-third"}
              weight={500}
              margin={0}
            />
            <Paragraph
              size
              text={
                "Lorem ipsum dolor sit amet, consectetur ing elit, sed do eiusmod tempor."
              }
              color={"text-third"}
              weight={400}
              margin={0}
            />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Row gutter={10} style={{ marginTop: "1rem" }}>
              <Col
                lg={{ span: 5 }}
                md={{ span: 5 }}
                sm={{ span: 6 }}
                xs={{ span: 6 }}
              >
                <Trophy
                  src={"/trophy.png"}
                  width={41}
                  height={51}
                  size="small"
                />
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
                xs={{ span: 12 }}
              >
                <Image
                  src={"/post-card.png"}
                  width={102}
                  height={61}
                  alt="Border Rowers"
                />
              </Col>
            </Row>
          </Col>
        </Row> */}
        <Row gutter={20}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Paragraph
              text={"Time Duration"}
              color={"text-third"}
              weight={500}
            />
            <div className="duration__wrapper">
              <InputDuration
                tag={"Days"}
                placeholder={"04"}
                disabled
                fieldValue={challengeDays}
              />
              <InputDuration
                tag={"Hrs"}
                placeholder={"22"}
                disabled
                fieldValue={0}
              />
              <InputDuration
                tag={"Mins"}
                placeholder={"45"}
                disabled
                fieldValue={0}
              />
              <InputDuration
                tag={"Secs"}
                placeholder={"00"}
                disabled
                fieldValue={0}
              />
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Paragraph
              text={"Set Start & End Date"}
              color={"text-third"}
              weight={500}
            />
            <Row className="view__challenge-dates" gutter={10}>
              <DetailBox
                title={"Start Date"}
                data={challenge?.formated_start_date}
                grid={8}
              />
              <DetailBox
                title={"End Date"}
                data={challenge?.formated_end_date}
                grid={8}
              />
            </Row>
          </Col>
        </Row>
        <Col
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Paragraph
            text={"Challenge Description"}
            color={"text-third"}
            weight={500}
          />
          <Paragraph
            size
            text={challenge?.description}
            color={"text-third"}
            weight={400}
          />
        </Col>
        <Col
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Paragraph
            text={"Set Rules & guidelines"}
            color={"text-third"}
            weight={500}
          />
          {challenge?.rules_guidelines?.map((rule, i) => (
            <Paragraph
              size
              text={rule}
              key={i}
              color={"text-third"}
              weight={400}
              margin={0}
            />
          ))}
        </Col>
        <Col
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <button
            className="cancle__btn"
            // onClick={() => handleDelete(challenge?.id)}
            onClick={() => setIsModalOpen(true)}
          >
            {loadingDeleteItem ? <Spin /> : "Delete Challenge"}
          </button>
        </Col>
      </AdminLayout>

      {/* Modal for acceptance  */}
      <Modal
        title={
          <Preheading
            text={"You Are Sure You Want To Delete!"}
            textAlign={"center"}
          />
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <Space
            size={"middle"}
            style={{ width: "100%", justifyContent: "center" }}
          >
            <button
              className="cancle__btn"
              onClick={() => handleDelete(challenge?.id)}
              style={{ width: "130px" }}
            >
              {loadingDeleteItem ? <Spin /> : "Yes"}
            </button>
            <button
              className="cancle__btn"
              onClick={() => setIsModalOpen(false)}
              style={{
                background: "var(--secondary-color)",
                width: "130px",
              }}
            >
              No
            </button>
          </Space>
          {/* <Button
            isLight={false}
            text={"Sign In Now"}
            route={"/login?redirect=challenge-subscription"}
            style={{ margin: "1rem auto" }}
          /> */}
        </div>
      </Modal>
      {/* Modal for acceptance  */}
    </>
  );
};

export default ChallengeSingle;

// const Acheivements = ({ src, title, para, level, miles }) => {
//   return (
//     <div className="view__manage-acheivement">
//       <div className="acheivement__img">
//         <Image src={src} alt="Border Rowers" width={31} height={31} />
//       </div>
//       <div className="acheivement__info">
//         <h3>{title}</h3>
//         <Paragraph size text={para} margin={0} color={"text-third"} />
//         <ul>
//           <li>
//             level : <span>{level}</span>
//           </li>
//           <li>
//             No of rowing & miles : <span>{miles}</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const Trophy = ({ src, width, height, size }) => {
//   return (
//     <div className={`view__manage-challenge ${size ? size : ""}`}>
//       <Image src={src} alt="Border Rowers" width={width} height={height} />
//     </div>
//   );
// };
