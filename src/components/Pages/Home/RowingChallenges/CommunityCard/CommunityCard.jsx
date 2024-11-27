import Image from "next/image";
import "./index.css";
import CustomHeading from "../../../../CustomHeading";
import Paragraph from "../../../../Paragraph";

const CommunityCard = ({ props, onClick }) => {
  return (
    <div className="communityCard">
      <div className="card-content">
        <div className="card-image d-flex align-items-center">
          {props &&
            props?.images?.map((image, i) => {
              return (
                <Image
                  src={image}
                  alt="border rower"
                  // fill
                  // sizes="100vw"
                  width={90}
                  height={90}
                  key={i}
                  className="rounded-circle"
                  style={{
                    objectFit: "cover",
                  }}
                />
              );
            })}
        </div>
        <div className="card-text">
          <CustomHeading text={props?.title} color={"text-primary"} />
          <Paragraph
            text={`More than ${props?.active_members} active rowing member`}
            color={"text-primary"}
            margin={0}
          />
        </div>
      </div>
      <button onClick={onClick}>Join Now</button>
    </div>
  );
};

export default CommunityCard;
