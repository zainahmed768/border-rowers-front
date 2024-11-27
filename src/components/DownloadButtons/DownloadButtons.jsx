import Image from "next/image";
import "./index.css";

const DownloadButtons = () => {
  return (
    <div className="btns__group">
      <button className="bg-primary">
        <Image
          src={"/home/play.svg"}
          alt="border rower"
          width={44}
          height={48}
        />
        <div className="text-white">
          <span>Available On the</span>
          <h4>Google Play</h4>
        </div>
      </button>
      <button className="bg-secondary">
        <Image
          src={"/home/apple.svg"}
          alt="border rower"
          width={44}
          height={48}
        />
        <div className="text-primary">
          <span>Download On the</span>
          <h4>App Store</h4>
        </div>
      </button>
    </div>
  );
};

export default DownloadButtons;
