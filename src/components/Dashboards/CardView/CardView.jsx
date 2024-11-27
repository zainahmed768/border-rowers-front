import Preheading from "../../Preheading";
import Paragraph from "../../Paragraph";
import Image from "next/image";
import "./index.css";
import { useRouter } from "next/navigation";
const CardView = ({ title, route, details }) => {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(`/organization/${route}`);
  };
  return (
    <div className="card__view" onClick={() => handleRoute(route)}>
      <div className="view__details">
        <Preheading
          text={title?.length > 25 ? `${title?.substring(0, 20)}...` : title}
          color={"text-primary"}
          margin={0}
          weight={700}
          textTransform={"capitalize"}
        />
        <Paragraph
          text={
            details == "undefined"
              ? ""
              : details?.length > 40
              ? `${details?.substring(0, 35)}...`
              : details
          }
          size
          margin={0}
          color={"text-primary"}
        />
      </div>
      <button>
        <Image src={"/chevron.png"} width={7} height={12} alt="Border Rowers" />
      </button>
    </div>
  );
};

export default CardView;
