import Image from "next/image";
import "./index.css";

const SelfImage = ({ src }) => {
  return (
    <div className="img__wrapper">
      <Image src={src} alt="Border Rowers" fill sizes="100vw" />
    </div>
  );
};

export default SelfImage;
