import { Card, Col, Row, Skeleton } from "antd";
import "../AllTimeMeter/index.css";
import { useGetUserChallengeQuery } from "../../../../features/api/GetChallengesApi";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../../../Dashboards/User/UserChallengeCard/index.css";

const ChallengeSpecific = () => {
  const { data, isLoading } = useGetUserChallengeQuery();
  const myChallenges = data?.response?.data;
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };

  return (
    <Row gutter={15}>
      {isLoading ? (
        <Col
          lg={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Skeleton active />
        </Col>
      ) : myChallenges && myChallenges?.data?.length > 0 ? (
        myChallenges?.data?.map((card, i) => (
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={i}
          >
            {/* <UserChallengeCard
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
			  route={'/leaderboard'}
            /> */}
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
                {/* <Row>
                  {info && info.length > 0
                    ? info?.map((info, i) => (
                        <Col
                          lg={{ span: 12 }}
                          md={{ span: 12 }}
                          sm={{ span: 24 }}
                          xs={{ span: 24 }}
                          key={i}
                        >
                          <Paragraph
                            text={info?.label}
                            margin={"5px 0 0 0"}
                            size
                            color={"text-white"}
                          />
                          <Paragraph
                            text={info?.value}
                            margin={0}
                            color={"text-white"}
                            weight={500}
                          />
                        </Col>
                      ))
                    : "No Challenges Found!"}
                </Row> */}
                <button
                  onClick={() =>
                    handleRoute(`/leaderboard/${card?.challenge_id}`)
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
        ))
      ) : // "No Challenge Found!"
      null}
    </Row>
  );
};

export default ChallengeSpecific;
