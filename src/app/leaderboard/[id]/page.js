"use client";
import { Col, Row } from "antd";
import { useLeaderboardContentQuery } from "../../../features/api/LeaderBoardApi";

import WinnerCard from "../../../components/Pages/RowAroundWorld/RecentWinners/WinnerCard/WinnerCard";
import Paragraph from "../../../components/Paragraph";
import PreLoader from "../../../components/PreLoader";
import RowerCard from "../../../components/Pages/RowAroundWorld/TopRowers/RowerCard/RowerCard";
import { Footer, Navbar } from "../../../components";
import InnerBanner from "../../../components/InnerBanner/InnerBanner";
import { useParams } from "next/navigation";
import Button from "../../../components/Button";

const LeaderboardSpecific = () => {
  const param = useParams();
  const { id } = param;
  const { data, isLoading } = useLeaderboardContentQuery({ challenge_id: id });
  let leaderData = data?.response?.data;
  // Toppers Array
  let topperData = leaderData ? Object.values(leaderData?.toppers) : [];
  const toppersCount = topperData.length;
  // List Array
  let listData = leaderData?.list;

  return (
    <>
      <Navbar isLight={true} />
      <InnerBanner title={"Leaderboard"} breadcrumb={true} />

      <div className="AllTimeMeter" style={{ padding: "3rem 0" }}>
        <div className="container">
          {/* <Button text={"All Leaderboards"} isLight={false} route={'/leaderboard'}/> */}
          <Row gutter={20} align={"middle"} justify={"center"}>
            <Col lg={{ span: 2 }}></Col>
            {!isLoading ? (
              <>
                {topperData && topperData.length > 0 ? (
                  topperData?.reverse()?.map((card, i) => (
                    <Col
                      lg={{ span: 4 }}
                      md={{ span: 6 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                      key={card?.id}
                    >
                      <WinnerCard
                        id={card?.user_id}
                        image={card?.image_url}
                        name={card?.title}
                        score={card?.row_total_meters}
                        position={i + 1}
                        isWinner={i == 0}
                      />
                    </Col>
                  ))
                ) : (
                  <Paragraph text={"No Data Found"} color={"text-primary"} />
                )}
              </>
            ) : (
              <PreLoader />
            )}
            <Col lg={{ span: 2 }}></Col>
          </Row>
          <div className="leaderboard__rowers">
            <Row gutter={40}>
              {listData && listData.length > 0
                ? listData?.reverse()?.map((rower, i) => (
                    <Col
                      lg={{ span: 12 }}
                      md={{ span: 24 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                      key={rower?.id}
                    >
                      <RowerCard
                        id={rower?.id}
                        image={rower?.image_url}
                        name={rower?.title}
                        // team={rower?.team}
                        score={rower?.total_meters}
                        position={i + 1 + toppersCount}
                      />
                    </Col>
                  ))
                : // <Paragraph text={"No Data Found"} color={"text-primary"} />
                  null}
            </Row>
          </div>
          {topperData.length > 12 && (
            <div style={{ maxWidth: "max-content", margin: "4rem auto" }}>
              <Paragraph
                text={"Load More"}
                color={"text-primary"}
                weight={600}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaderboardSpecific;
