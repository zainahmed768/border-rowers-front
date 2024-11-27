"use client";
import { Col, Row } from "antd";
import "./index.css";
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import DownloadButtons from "../../../DownloadButtons/DownloadButtons";
import WinnerCard from "./WinnerCard/WinnerCard";
import { rowingWinners } from "../../../../constants";

const RecentWinners = () => {
  return (
    <div className="recentWinners">
      <div className="container">
        <Row gutter={40} align={"middle"}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Preheading text={"Recent Winners"} color={"text-primary"} />
            <CustomHeading
              text={"have a look at winner of the recent row around the world."}
              color={"text-primary"}
              weight={700}
            />
            <Paragraph
              text={
                "With our app, you can easily connect with other users and participate in real-time rowing challenges that will push you to your limits. Whether you're a beginner or a seasoned pro, our platform is designed to help you improve your technique, track your progress, and compete against the best rowers in the world."
              }
              color={"text-primary"}
            />
            <DownloadButtons />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <div className="winnerCard__wrapp">
              <Row gutter={30} align={"middle"}>
                {rowingWinners && rowingWinners.length > 0
                  ? rowingWinners?.map((winner) => (
                      <Col
                        lg={{ span: 8 }}
                        md={{ span: 24 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                        key={winner?.id}
                      >
                        <WinnerCard
                          image={winner?.image}
                          name={winner?.name}
                          score={winner?.score}
                          position={winner?.position}
                          id={winner?.id}
                          isWinner={winner?.isWinner}
                        />
                      </Col>
                    ))
                  : "Not Found"}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecentWinners;
