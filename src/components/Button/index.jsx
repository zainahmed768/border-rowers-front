import Image from "next/image";
import "./Button.css";
import { useRouter } from "next/navigation";

const Button = ({
  text,
  isLight,
  style,
  route,
  isSubscribed,
  onClick,
}) => {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };
  return (
    <button
      className={`btn-main ${isLight ? "bg-white" : "bg-secondary"} ${
        isSubscribed ? "bg-mint" : ""
      }`}
      style={style}
      onClick={onClick ? onClick : () => handleRoute(route)}
    >
      <span className="btn__text">{text}</span>
      <span className="btn__icon">
        {isLight ? (
          <Image
            src={"/arrow-right.svg"}
            width={15}
            height={14}
            alt="Border Rowers"
          />
        ) : (
          <Image
            src={"/icon _arrow-left.svg"}
            width={15}
            height={14}
            alt="Border Rowers"
          />
        )}
      </span>
    </button>
  );
};

export default Button;
