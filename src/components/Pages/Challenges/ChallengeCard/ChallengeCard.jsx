import { Space, Tag } from "antd";
import Image from "next/image";
import Button from "../../../Button";
import "./index.css";
import Paragraph from "../../../Paragraph";
const ChallengeCard = ({
  by,
  title,
  desc,
  price,
  isFree,
  isHard,
  img,
  isSubscribed,
  slug,
  startDate,
  endDate,
}) => {
  const currDate = new Date();
  const startingDate = new Date(startDate);

  // console.log('today', currDate, startDate)
  return (
    <div className="challenge__card">
      <Image
        src={"/logo-thumb.png"}
        alt="Border Rowers"
        height={80}
        width={80}
        className="logo__thumb"
      />
      <div className="challenge-bg">
        <Image src={img} alt="Border Rowers" fill sizes="100vw" />
      </div>
      <div className="chellenge-info">
        <div className="labels">
          <Space size={[0, 8]} wrap>
            {isFree === 1 && <Tag color="#C73232">Free</Tag>}
            <Tag color={isHard == "Hard" ? "#C73232" : "#32C741"}>{isHard}</Tag>
            {/* {isHard ? (
              <Tag color="#C73232">Hard</Tag>
            ) : (
              <Tag color="#32C741">Easy</Tag>
            )} */}
          </Space>
        </div>
        <p className="chellenge__by">{by}</p>
        <h3 className="challenge__name">
          {title?.length > 24 ? `${title?.substring(0, 24)}...` : title}
        </h3>
        <p className="date">Starting at: {startDate}</p>
        <p className="date">Ends at: {endDate}</p>
        {/* <p className="chellenge__description">{desc}</p> */}
        <Paragraph
          text={desc.length > 100 ? `${desc.substring(0, 100)}...` : desc}
          color={"text-white"}
        />
        <div className="challenge__foo">
          <Button
            isLight={false}
            // text={isSubscribed ? "Already Subscribed" : "Subscribe Challenge"}
            text={"View Challenge"}
            isSubscribed={isSubscribed ? true : false}
            route={`/challenges/${slug}`}
          />
          {/* <Button
            isLight={false}
            text={
              isSubscribed
                ? "Already Subscribed"
                : currDate > startingDate  
                  ? "Challenge Expired"
                  : "Subscribe Challenge"
            }
            isSubscribed={isSubscribed ? true : false}
            route={`/challenges/${slug}`}
          /> */}
          <h2 className="chellenge__price">
            {/* {isFree !== 1 && `${"$" + price}`} */}${price}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
