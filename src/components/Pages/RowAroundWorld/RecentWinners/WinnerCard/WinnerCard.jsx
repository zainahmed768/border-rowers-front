import Image from "next/image";
import "./index.css";
import { Col, Modal, Row, Space, Spin, Tag } from "antd";
import { Typography } from "antd";
import CountUp from "react-countup";
import { useState } from "react";
import {
  useGetParticipantDataQuery,
  useLazyGetParticipantDataQuery,
} from "../../../../../features/api/LeaderBoardApi";
import Paragraph from "../../../../Paragraph";
import Preheading from "../../../../Preheading";
import { getCookie } from "cookies-next";
import Button from "../../../../Button";

const WinnerCard = ({ image, name, score, position, id, isWinner }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [trigger, { isLoading, error, data }] =
    useLazyGetParticipantDataQuery();

  const handleModalTrigger = () => {
    setIsModalOpen(true);
    trigger(id);
  };

  const getLoggedInState = getCookie("token");
  return (
    <>
      <div
        className={`winner__card winner__card-${id}`}
        onClick={handleModalTrigger}
      >
        <div className="winner__img">
          <Image
            src={image}
            alt="Border Rower"
            style={{ borderRadius: "50%", border: "4px solid #fff" }}
            width={96}
            height={96}
          />
          <Tag color="#F6CD3B">
            {isWinner ? (
              <Image
                src={"/home/crown.png"}
                alt="Border Rower"
                width={17}
                height={15}
              />
            ) : (
              position
            )}
          </Tag>
        </div>
        <Typography.Title level={4}>
          {name.length > 12 ? `${name.substring(0, 8)}...` : name}
        </Typography.Title>
        <Typography.Title level={3}>
          <CountUp start={0} end={score} duration={3} />
        </Typography.Title>
      </div>

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="leaderboard__modal">
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          ) : !getLoggedInState ? (
            <>
              <Preheading text={"You are not logged in"} textAlign={"center"} />
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
                  src={data?.response?.data?.profile?.image_url}
                  height={100}
                  width={100}
                  style={{ borderRadius: "50%" }}
                />
                <Paragraph
                  text={data?.response?.data?.profile?.name}
                  margin={0}
                  weight={700}
                />
                <Paragraph
                  text={data?.response?.data?.profile?.email}
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
                          text={data?.response?.data?.stats?.formated_meters}
                          margin={0}
                          weight={700}
                        />
                      </div>
                      <div>
                        <Paragraph size text={"Total Time"} margin={0} />
                        <Paragraph
                          text={`${data?.response?.data?.stats?.time}D`}
                          margin={0}
                          weight={700}
                        />
                      </div>
                      <div>
                        <Paragraph size text={"Split / 500M"} margin={0} />
                        <Paragraph
                          text={data?.response?.data?.stats?.split}
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
                        <Paragraph size text={"Active Challenges"} margin={0} />
                        <Paragraph
                          text={
                            data?.response?.data?.stats?.user_active_challenges
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
                            data?.response?.data?.stats?.total_user_challenges
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
                            data?.response?.data?.stats
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
    </>
  );
};

export default WinnerCard;
