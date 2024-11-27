import { Col, Row, Spin } from "antd";
import "./index.css";
import WinnerCard from "../../RowAroundWorld/RecentWinners/WinnerCard/WinnerCard";
import RowerCard from "../../RowAroundWorld/TopRowers/RowerCard/RowerCard";
import Paragraph from "../../../Paragraph";
import PreLoader from "../../../PreLoader";
import { useLeaderboardContentQuery } from "../../../../features/api/LeaderBoardApi";
import { useEffect, useState } from "react";

const AllTimeMeter = ({ data, loading }) => {
  // const { data, isLoading, refetch } = useLeaderboardContentQuery({
  //   filter_by: param,
  // });
  // let leaderData = data?.response?.data;

  // useEffect(() => {
  //   refetch();
  // }, [tabKey]);
  // Toppers Array
  let topperData = data ? Object.values(data?.toppers) : [];

  const toppersCount = topperData.length;

  // List Array
  let listData = data?.list;
  return (
    <div className="AllTimeMeter">
      <Row gutter={20} align={"middle"} justify={"center"}>
        <Col lg={{ span: 2 }}></Col>
        {!loading ? (
          <>
            {topperData && topperData.length > 0
              ? topperData?.reverse()?.map((card, i) => (
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
              : // <Paragraph text={"No Top Scorers Found"} color={"text-primary"} />
                null}
          </>
        ) : (
          <Spin />
          // <PreLoader />
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
                    score={rower?.row_total_meters}
                    position={i + 1 + toppersCount}
                  />
                </Col>
              ))
            : // <Paragraph text={"No Scorers Found"} color={"text-primary"} />
              null}
        </Row>
      </div>
      {toppersCount > 12 && (
        <div style={{ maxWidth: "max-content", margin: "4rem auto" }}>
          <Paragraph text={"Load More"} color={"text-primary"} weight={600} />
        </div>
      )}
    </div>
  );
};

export default AllTimeMeter;
