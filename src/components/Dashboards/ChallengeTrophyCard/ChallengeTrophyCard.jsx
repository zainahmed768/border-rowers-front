import "./index.css";
import SelfImage from "../../SelfImage/SelfImage";
import Paragraph from "../../Paragraph";

const ChallengeTrophyCard = ({ src, title, distance, frequency, time }) => {
  return (
    <div className="ChallengeTrophyCard">
      <div className="trophy__img">
        <SelfImage src={src} />
      </div>
      <div className="ctrophy__info">
        <h4 className="text-third">{title}</h4>
        <Paragraph
          size
          text={`Distance : ${distance}`}
          margin={0}
          color={"text-third"}
        />
        <Paragraph
          size
          text={`Frequency : ${frequency}`}
          margin={0}
          color={"text-third"}
        />
        <Paragraph
          size
          text={`Time : ${time}`}
          margin={0}
          color={"text-third"}
        />
      </div>
    </div>
  );
};

export default ChallengeTrophyCard;
