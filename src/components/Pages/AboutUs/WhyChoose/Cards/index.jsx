import { Card } from "antd";
import { Typography } from "antd";
import "./index.css";
import Image from "next/image";
import CountUp from "react-countup";
const ChooseCards = ({ image, title, score, className }) => {
  return (
    <Card className={`about__card choose__card ${className}`}>
      <Image src={image} width={70} height={70} alt="Border Rowers" />
      <div className="card__info">
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Title level={3}>
          <CountUp duration={5} start={0} end={score} enableScrollSpy={true} />
        </Typography.Title>
      </div>
    </Card>
  );
};

export default ChooseCards;
