"use client";
import { Card, Col, Pagination, Row, Skeleton, Tabs } from "antd";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import UserChallengeCard from "../../../components/Dashboards/User/UserChallengeCard/UserChallengeCard";
import { Navbar } from "../../../components";
import { useGetUserChallengeQuery } from "../../../features/api/GetChallengesApi";
import Image from "next/image";
import Paragraph from "../../../components/Paragraph";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyChallengeTabs from "../../../components/Dashboards/User/MyChallengeTabs/MyChallengeTabs";

const MyChallenges = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetUserChallengeQuery({ page: page });
  const myChallenges = data?.response.data;
  useEffect(() => {
    refetch();
  }, []);

  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };

  const handlePageChange = (page) => {
    setPage(page);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />  
        {/* <Tabs defaultActiveKey="1" items={tabItems} className="full__w-tabs"/> */}
      <UserLayout>
        <DashboardTitle title={"My Challenges"} />
        <MyChallengeTabs/>
        {/* <Row gutter={15}>
          {isLoading ? (
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Skeleton active />
            </Col>
          ) : myChallenges && myChallenges?.data?.length > 0 ? (
            myChallenges?.data?.map((card, i) => {
              return (
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                  key={i}
                >

                  while uncomment, comment the whole tag 
                 <UserChallengeCard
                    image={card?.cover_image}
                    by={card?.created_by}
                    startDate={card?.start_date}
                    endDate={card?.end_date}
                    meters={card?.meters_covered}
                    rows={card?.total_rowing}
                    postion={card?.positions}
                    speed={card?.speed}
                    type={card?.participation_type}
                    title={card?.title}
                    slug={card?.title}
                    status={card?.status}
                    id={card?.id}
                    route={'/user/my-challenges'}
                  />
                  while uncomment, comment the whole tag 
                  <Card className="userChallengeCard">
                    <Image
                      src={
                        card?.cover_image == null
                          ? "/post-card.png"
                          : card?.cover_image
                      }
                      alt="Border Rowers"
                      fill
                      sizes="100vw"
                      className="userChallenge__img"
                    />
                    <div className="userChallenge__content">
                      <Paragraph
                        text={card?.created_by}
                        margin={0}
                        color={"text-secondary"}
                      />
                      <h3 className="text-white">
                        {card?.title == null
                          ? "Challenge Title"
                          : card?.title > 5
                          ? `${card?.title.substring(0, 5)}...`
                          : card?.title}
                      </h3>
                      <Paragraph
                        text={`${
                          card?.start_date == null ? "" : card?.start_date
                        } to ${card?.end_date == null ? "" : card?.end_date}`}
                        size
                        margin={0}
                        color={"text-white"}
                        weight={300}
                      />
                      <Row>
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                        >
                          <Paragraph
                            text={"Total Meters"}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={card?.meters_covered}
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                        >
                          <Paragraph
                            text={"No Of Rows"}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={card?.total_rowing}
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                        >
                          <Paragraph
                            text={"Position"}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={card?.positions}
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                        >
                          <Paragraph
                            text={"Mode of participation"}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={card?.participation_type}
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                        >
                          <Paragraph
                            text={"Speed"}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={card?.speed}
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                        >
                          <Paragraph
                            text={"Status"}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={
                              card?.status == 0 ? "In Progress" : "Start Soon"
                            }
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                      </Row>
                      <button
                        onClick={() =>
                          handleRoute(`${"/user/my-challenges"}/${card?.id}`)
                        }
                      >
                        <Image
                          src={"/arrow-dark.svg"}
                          alt="Border Rowers"
                          height={19}
                          width={21}
                        />
                      </button>
                    </div>
                  </Card>
                </Col>
              )
            })
          ) : (
            "No Challenge Found!"
          )}
        </Row>
        <Pagination
          current={page}
          pageSize={myChallenges?.per_page}
          onChange={handlePageChange}
          total={myChallenges?.total}
          hideOnSinglePage
          responsive
          style={{ marginTop: "14px" }}
        /> */}
      </UserLayout>
    </>
  );
};

export default MyChallenges;
