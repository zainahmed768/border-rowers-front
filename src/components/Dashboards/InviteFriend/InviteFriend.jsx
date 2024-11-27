import Image from "next/image";
import "./index.css";
const InviteFriend = ({ src, name, score }) => {
  return (
    <div className="invite__wrapp">
      <div className="friend__wrap">
        <Image src={src} width={49} height={49} alt="Border Rowers" />
        <div className="friend__info">
          <h4>{name}</h4>
          <h5>{score}</h5>
        </div>
      </div>
      <button className="invite__friend">Send Invite</button>
    </div>
  );
};

export default InviteFriend;
