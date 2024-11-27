import Image from "next/image";
import "./index.css";

const ShareButton = () => {
  return (
    <button className="share__btn">
      <Image src={"/share.svg"} alt="Border Rowers" width={23} height={25} />
    </button>
  );
};

export default ShareButton;
