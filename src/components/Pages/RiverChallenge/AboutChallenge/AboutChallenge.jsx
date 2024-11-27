import { Col, Row, Tag } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import Image from "next/image";
import CountUp from "react-countup";
import ShowMap from "../../../ShowMap/ShowMap";

const AboutChallenge = ({
  by,
  title,
  startDate,
  endDate,
  description,
  active_participants,
  difficulty_level,
  coverImage,
  participantsImages,
}) => {
  return (
    <div className="AboutChallenge">
      <div className="container">
        <Row align={"bottom"} gutter={30}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading
              text={by}
              color={"text-primary"}
              transform="uppercase"
            />
            <CustomHeading
              text={title}
              color={"text-primary"}
              weight={700}
              margin={0}
            />
            <Paragraph
              text={`Starting at ${startDate} & Ends at ${endDate}`}
              color={"text-primary"}
              weight={300}
              margin={0}
            />
            <br />
            <h3 className="description__title">About {title}</h3>
            <Paragraph text={description} color={"text-primary"} />
            <div className="descripton__foo">
              <div className="participants">
                <div className="participant__wrap">
                  <div className="participant__img">
                    {participantsImages?.slice(0, 3)?.map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt="Border Rowers"
                        width={70}
                        height={70}
                        style={{ borderRadius: "50%" }}
                      />
                    ))}
                  </div>
                  <div className="participant__info">
                    <h4 className="totals">
                      total{" "}
                      <CountUp
                        start={0}
                        end={active_participants}
                        duration={3}
                      />
                    </h4>
                    <h5 className="totals">Active Participants </h5>
                  </div>
                </div>
              </div>
              <div className="level">
                <Paragraph text={"Difficulty level"} size={true} weight={300} />
                <Tag color={difficulty_level == "Easy" ? "#32c741" : "#C73232"}>
                  {difficulty_level}
                </Tag>
              </div>
            </div>
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="river__challenge-map">
              <Image src={coverImage} fill sizes="100vw" alt="Border Rowers" />
            </div>
            {/* <div className="river__challenge-map">
              {route && route.length > 0 ? (
                <ShowMap routes={parsedData} key={slug}/>
              ) : (
                <Image
                  src={coverImage}
                  fill
                  sizes="100vw"
                  alt="Border Rowers"
                />
              )}
            </div> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutChallenge;
