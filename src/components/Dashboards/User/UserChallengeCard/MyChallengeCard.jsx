import { Card, Col, Pagination, Row, Skeleton } from "antd";
import Image from "next/image";
// import React, { useEffect, useState } from "react";
import Paragraph from "../../../Paragraph";
import { useRouter } from "next/navigation";
// import { useGetUserChallengeQuery } from "../../../../features/api/GetChallengesApi";

const MyChallengeCard = ({
  // meters,
  // rows,
  // postion,
  // speed,
  // type,
  // status,
  // param,
  data,
  loading,
  handlePageChange,
  page,
}) => {
  const router = useRouter();

  // const [page, setPage] = useState(1);
  // const { data, isLoading, refetch } = useGetUserChallengeQuery({
  //   page: page,
  //   filter_by: param,
  // });
  const myChallenges = data?.response.data;

  // useEffect(() => {
  //   refetch();
  // }, []);

  // const handlePageChange = (page) => {
  //   setPage(page);
  //   scrollTo({ top: 0, behavior: "smooth" });
  // };

  const handleRoute = (route) => {
    router.push(route);
  };
  // const info = [
  //   {
  //     label: "Total Meters",
  //     value: meters == null ? 0 : meters,
  //   },
  //   {
  //     label: "No Of Rows",
  //     value: rows == null ? 0 : rows,
  //   },
  //   {
  //     label: "Position",
  //     value: postion == null ? 0 : postion,
  //   },
  //   {
  //     label: "Mode of participation",
  //     value: type == null ? 0 : type,
  //   },
  //   {
  //     label: "Speed",
  //     value: speed == null ? 0 : speed,
  //   },
  //   {
  //     label: "Status",
  //     value: status,
  //   },
  // ];
  return (
    <>
      <Row gutter={15}>
        {loading ? (
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
                        : card?.title.length > 20
                          ? `${card?.title.substring(0, 20)}...`
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
                      {/* <Col
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
                      </Col> */}
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
                          text={"Mode"}
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
                      {/* <Col
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
                      </Col> */}
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
                          text={card?.subscription_status}
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
            );
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
      />
    </>
  );
};

export default MyChallengeCard;
