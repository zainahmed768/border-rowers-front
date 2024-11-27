import { Card, Col, Row } from "antd";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";

const UserChallengeCard = ({
  image,
  by,
  startDate,
  endDate,
  meters,
  rows,
  postion,
  speed,
  type,
  title,
  slug,
  status,
  id,
  route,
}) => {
  // Handle Routing
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };

  // Get Slug
  if (slug !== null) {
    const challengeSlug = slug
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    return challengeSlug;
  }

  // Converting props to Array
  const info = [
    {
      label: "Total Meters",
      value: meters == null ? 0 : meters,
    },
    {
      label: "No Of Rows",
      value: rows == null ? 0 : rows,
    },
    {
      label: "Position",
      value: postion == null ? 0 : postion,
    },
    {
      label: "Mode of participation",
      value: type == null ? 0 : type,
    },
    {
      label: "Speed",
      value: speed == null ? 0 : speed,
    },
    {
      label: "Status",
      value:
        status == 0 ? "Finished" : status == 1 ? "In Progress" : "Start Soon",
    },
  ];
  return (
    <Card className="userChallengeCard">
      <Image
        src={image == null ? "/post-card.png" : image}
        alt="Border Rowers"
        fill
        sizes="100vw"
        className="userChallenge__img"
      />
      <div className="userChallenge__content">
        <Paragraph text={by} margin={0} color={"text-secondary"} />
        <h3 className="text-white">
          {title == null
            ? "Challenge Title"
            : title?.length > 22
            ? `${title.substring(0, 22)}...`
            : title}
        </h3>
        <Paragraph
          text={`${startDate == null ? "" : startDate} to ${
            endDate == null ? "" : endDate
          }`}
          size
          margin={0}
          color={"text-white"}
          weight={300}
        />
        <Row>
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
        </Row>
        <button onClick={() => handleRoute(`${route}/${id}`)}>
          <Image
            src={"/arrow-dark.svg"}
            alt="Border Rowers"
            height={19}
            width={21}
          />
        </button>
      </div>
    </Card>
  );
};

export default UserChallengeCard;
