import Image from "next/image";
import "../Button/Button.css";

const SubmitButton = ({ text, isLight, style, type }) => {
  return (
    <button
      className={`btn-main ${isLight ? "bg-white" : "bg-secondary"}`}
      style={style}
      type={type}
    >
      <span className="btn__text">{text}</span>
      <span className="btn__icon">
        <Image
          src={"/arrow-right.svg"}
          width={15}
          height={14}
          alt="Border Rowers"
        />
      </span>
    </button>
  );
};

export default SubmitButton;
