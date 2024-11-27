import { Card } from "antd";
import "./LeaderboardCard.css";
import Image from "next/image";
import { Typography } from "antd";

const LeaderboardCard = ({ image, position, name, score, id }) => {
  return (
    <Card className={`leaderboard-card bg-secondary leaderboard__${id}`}>
      <div className="image__container">
        <Image
          src={image}
          alt="Border Rowers"
          width={76}
          height={76}
          style={{ borderRadius: "50%", border: "4px solid #fff" }}
        />
        <span className="badge">
          {position == 1 ? (
            <Image
              src={"/home/crown.png"}
              alt="Border Rower"
              width={17}
              height={15}
            />
          ) : position == 2 ? (
            "2"
          ) : (
            "3"
          )}
        </span>
      </div>
      <div className="card__body">
        <Typography.Title level={5}>
          {name.length > 12 ? `${name.substring(0, 12)}...` : name}
        </Typography.Title>
        <Typography.Title level={4}>{score}</Typography.Title>
      </div>
    </Card>
  );
};

export default LeaderboardCard;
