import { Card, Col, Row } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import ChallengeTrophyCard from "../../../Dashboards/ChallengeTrophyCard/ChallengeTrophyCard";
import FlipCard from "../../../FlipCard/FlipCard";

export const DetailBox = ({ title, data, grid }) => {
  return (
    <Col
      lg={{ span: grid }}
      md={{ span: grid }}
      sm={{ span: 24 }}
      xs={{ span: 24 }}
      className="details__box"
    >
      <Card>
        <Paragraph text={title} color={"text-primary"} />
        <h4>{data}</h4>
      </Card>
    </Col>
  );
};

const ChallengeDetails = ({
  starDate,
  endDate,
  distance,
  importantDetail,
  props,
}) => {
  // console.log(props, "challengeDetail");
  return (
    <div className="ChallengeDetails">
      <div className="container">
        <Row align={"middle"} justify={"center"} gutter={[20, 20]}>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Row gutter={20} align={"middle"}>
              <DetailBox title={"Start Date:"} data={starDate} grid={6} />
              <DetailBox title={"End Date:"} data={endDate} grid={6} />
              <DetailBox title={"Challenge Type"} data={"Solo"} grid={6} />
              <DetailBox title={"Total Distance"} data={distance} grid={6} />
            </Row>
          </Col>
          {/* <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading text={"important Details"} color={"text-primary"} />
            <CustomHeading
              text={"important Details regarding River challenge "}
              weight={700}
              color={"text-primary"}
            />
            <Paragraph text={importantDetail} color={"text-primary"} />
          </Col> */}
        </Row>
        {/* <div className="challenge__rewards">
          <div className="challenge__trophies">
            {props?.postcards?.length > 0 && props?.postcards?.length > 0 && (
              <Preheading text={"Challenge Rewards"} color={"text-primary"} />
            )}

            {props?.trophies?.length > 0 && (
              <CustomHeading
                text={"Trophies"}
                weight={700}
                color={"text-primary"}
              />
            )}

            <Row gutter={20}>
              {props?.trophies?.map((_) => (
                <Col lg={8} md={12} sm={24} xs={24} key={_?.id}>
                  <ChallengeTrophyCard
                    src={_?.image_url}
                    title={_?.title}
                    distance={`${_?.distance} Meters`}
                    frequency={`Every ${_?.frequency} Hours`}
                    time={`${_?.time} Days in a Row`}
                  />
                </Col>
              ))}
            </Row>
          </div>
          <div className="challenge__postcards">
            {props?.postcards?.length > 0 && (
              <CustomHeading
                text={"Postcards"}
                weight={700}
                color={"text-primary"}
              />
            )}

            <Row gutter={20}>
              {props?.postcards?.map((_) => (
                <Col lg={8} md={12} sm={24} xs={24} key={_?.id}>
                  <FlipCard
                    title={_?.title}
                    description={_?.description}
                    distance={_?.milestone}
                    frontImage={_?.image_url_front}
                    isOrg={true}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ChallengeDetails;
