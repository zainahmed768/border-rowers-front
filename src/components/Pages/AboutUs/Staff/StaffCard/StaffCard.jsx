import Image from "next/image";
import "./index.css";
import Paragraph from "../../../../Paragraph";

const StaffCard = ({ image, name, designation }) => {
  return (
    <div className="staff__card">
      <div className="staff__image">
        <Image src={image} alt="Border Rowers" fill sizes="100vw" />
      </div>
      <div className="staff__info">
        <h3>{name}</h3>
        <Paragraph
          text={designation}
          color={"text-primary"}
          margin={0}
          size={"small"}
        />
      </div>
    </div>
  );
};

export default StaffCard;
