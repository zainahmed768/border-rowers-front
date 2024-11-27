"use client";
import AdminLayout from "../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import SubTitle from "../../../components/SubTitle/SubTitle";
import Paragraph from "../../../components/Paragraph";
import { Col, Modal, Row, Space, Spin } from "antd";
import { Navbar } from "../../../components";
import Image from "next/image";
import { useViewUsersQuery } from "../../../features/api/OrganizationApi";
import { useParams, useRouter } from "next/navigation";
import "../../../components/Dashboards/User/MyTeam/TeamCardSingle/index.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLazyGetParticipantDataQuery } from "../../../features/api/LeaderBoardApi";
import Preheading from "../../../components/Preheading";
import Button from "../../../components/Button";
import { getCookie } from "cookies-next";

const ViewUserSingle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let { users } = useParams();
  const { data, isLoading } = useViewUsersQuery(users);
  const userData = data?.response?.data;
  const router = useRouter();
  console.log(data, "data");
  // For modal purpose
  const [trigger, { isLoading: statsLoading, data: statsData }] =
    useLazyGetParticipantDataQuery();

  // handle modal trigger
  const handleModalTrigger = (id) => {
    console.log(id, 'id')
    setIsModalOpen(true);
    trigger(id);
  };

  const getLoggedInState = getCookie("token");
  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <Row align={"middle"}>
          <Col
            lg={{ span: 22 }}
            md={{ span: 22 }}
            sm={{ span: 22 }}
            xs={{ span: 22 }}
          >
            <DashboardTitle title={"Organization  Dashboard"} />
          </Col>
          <Col
            lg={{ span: 2 }}
            md={{ span: 2 }}
            sm={{ span: 2 }}
            xs={{ span: 2 }}
          >
            <ArrowLeftOutlined
              style={{
                fontSize: "30px",
                color: "var(--primary-color)",
                cursor: "pointer",
              }}
              onClick={() => router.back()}
            />
          </Col>
        </Row>

        {isLoading ? (
          <Spin />
        ) : (
          <>
            <SubTitle title={userData?.challenge_title} />
            <Paragraph text={userData?.challenge_description} />
            <div className="challengers__info users__table">
              <Row gutter={20} style={{ marginBottom: "2rem" }}>
                <Col
                  lg={{ span: 8 }}
                  md={{ span: 8 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Paragraph
                    size
                    text={"Start Date:"}
                    margin={0}
                    color={"text-primary"}
                  />
                  <Paragraph
                    text={userData?.start_date}
                    margin={0}
                    weight={600}
                    color={"text-primary"}
                  />
                </Col>
                <Col
                  lg={{ span: 8 }}
                  md={{ span: 8 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Paragraph
                    size
                    text={"End Date:"}
                    margin={0}
                    color={"text-primary"}
                  />
                  <Paragraph
                    text={userData?.end_date}
                    margin={0}
                    weight={600}
                    color={"text-primary"}
                  />
                </Col>
                <Col
                  lg={{ span: 8 }}
                  md={{ span: 8 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Paragraph
                    size
                    text={"Total Distance"}
                    margin={0}
                    color={"text-primary"}
                  />
                  <Paragraph
                    text={`${userData?.total_distance} Meters`}
                    margin={0}
                    weight={600}
                    color={"text-primary"}
                  />
                </Col>
              </Row>
              <Row gutter={20}>
                {userData && userData?.users.length > 0
                  ? userData?.users?.map((card, i) => (
                      <Col
                        lg={{ span: 8 }}
                        md={{ span: 8 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                        key={i}
                      >
                        <div
                          className="team__card-single"
                          onClick={() => handleModalTrigger(card?.user_id)}
                        >
                          <div className="member__img">
                            <Image
                              src={card?.profile_image_url}
                              alt="Border Rowers"
                              height={49}
                              width={49}
                              style={{ borderRadius: "50%" }}
                            />
                          </div>
                          <div className="members__info">
                            <h3 className="member__name">{card?.first_name}</h3>
                            <h2
                              className="member__score"
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                                marginTop: "10px",
                              }}
                            >
                              {/* <Image
                              src={"/score.png"}
                              alt="Border Rowers"
                              height={17}
                              width={30}
                            /> */}
                              {card?.meters_covered} M
                            </h2>
                          </div>
                        </div>
                      </Col>
                    ))
                  : "No Users Found"}
              </Row>
            </div>
          </>
        )}

        <Modal
          // title="Basic Modal"
          open={isModalOpen}
          // onOk={handleOk}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className="leaderboard__modal">
            {statsLoading ? (
              <div style={{ textAlign: "center" }}>
                <Spin />
              </div>
            ) : !getLoggedInState ? (
              <>
                <Preheading
                  text={"You are not logged in"}
                  textAlign={"center"}
                />
                <Button
                  text={"Login Now"}
                  style={{ margin: "auto" }}
                  route={"/login"}
                />
              </>
            ) : (
              <>
                <div className="leaderboard__modal-head">
                  <Image
                    src={statsData?.response?.data?.profile?.image_url}
                    height={100}
                    width={100}
                    style={{ borderRadius: "50%" }}
                  />
                  <Paragraph
                    text={statsData?.response?.data?.profile?.name}
                    margin={0}
                    weight={700}
                  />
                  <Paragraph
                    text={statsData?.response?.data?.profile?.email}
                    margin={0}
                  />
                </div>

                <div className="leaderboard__modal-body">
                  <Preheading text={"User Stats"} />
                  <Row>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <Space size={"middle"} direction="vertical">
                        <div>
                          <Paragraph size text={"Total Meters"} margin={0} />
                          <Paragraph
                            text={statsData?.response?.data?.stats?.formated_meters}
                            margin={0}
                            weight={700}
                          />
                        </div>
                        <div>
                          <Paragraph size text={"Total Time"} margin={0} />
                          <Paragraph
                            text={`${statsData?.response?.data?.stats?.time}D`}
                            margin={0}
                            weight={700}
                          />
                        </div>
                        <div>
                          <Paragraph size text={"Split / 500M"} margin={0} />
                          <Paragraph
                            text={statsData?.response?.data?.stats?.split}
                            margin={0}
                            weight={700}
                          />
                        </div>
                      </Space>
                    </Col>
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 12 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <Space size={"middle"} direction="vertical">
                        <div>
                          <Paragraph
                            size
                            text={"Active Challenges"}
                            margin={0}
                          />
                          <Paragraph
                            text={
                              statsData?.response?.data?.stats
                                ?.user_active_challenges
                            }
                            margin={0}
                            weight={700}
                          />
                        </div>
                        <div>
                          <Paragraph
                            size
                            text={"Challenges Participated"}
                            margin={0}
                          />
                          <Paragraph
                            text={
                              statsData?.response?.data?.stats?.total_user_challenges
                            }
                            margin={0}
                            weight={700}
                          />
                        </div>
                        <div>
                          <Paragraph
                            size
                            text={"Challenges Completed"}
                            margin={0}
                          />
                          <Paragraph
                            text={
                              statsData?.response?.data?.stats
                                ?.total_user_complete_challenges
                            }
                            margin={0}
                            weight={700}
                          />
                        </div>
                      </Space>
                    </Col>
                  </Row>
                </div>
              </>
            )}
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
};

export default ViewUserSingle;
