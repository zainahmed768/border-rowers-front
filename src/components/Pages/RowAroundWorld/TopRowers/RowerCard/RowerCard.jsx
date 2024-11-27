"use client";

import { Tag } from "antd";
import Image from "next/image";
import CountUp from "react-countup";
import "./index.css";
const RowerCard = ({ image, name, team, score, id, position }) => {
  return (
    <div className="topRower__card">
      <div className="rower__info">
        {/* <Tag color="#F6CD3B">{id < 10 ? `0${id}` : id}</Tag> */}
        <Tag color="#F6CD3B">{position}</Tag>
        <div className="rower__image">
          <Image src={image} alt="Border Rower" width={70} height={70} />
        </div>
        <div className="rower__data">
          <h4>{name}</h4>
          {/* <p>
            Team <strong>{team}</strong>
          </p> */}
        </div>
      </div>
      <div className="rower__score">
        <h3>
          <CountUp start={0} end={score} />
        </h3>
      </div>
    </div>
  );
};

export default RowerCard;
