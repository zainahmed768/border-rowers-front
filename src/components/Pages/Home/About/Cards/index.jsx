import { Card } from "antd";
import { Typography } from "antd";
import "./aboutCards.css";
import Image from "next/image";
import CountUp from "react-countup";

const AboutCard = ({ image, title, score, className }) => {
  return (
    <Card className={`about__card ${className}`}>
      <Image src={image} width={82} height={82} alt="Border Rowers" />
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Title level={3}>
        {/* {score} */}
        {score}
      </Typography.Title>
    </Card>
  );
};

export default AboutCard;
