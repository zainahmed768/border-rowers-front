import Image from "next/image";
import Paragraph from "../../../../Paragraph";
import "./index.css";
import "../../../../ThemeButton/index.css";
import { useTrophyVisibilityQuery } from "../../../../../features/api/GetUserStuff";
import { useEffect, useState } from "react";
import { Button, Spin, notification } from "antd";
import { capitalizeWords } from "../../../../../utils/utils";

const TrophyCard = ({
  title,
  date,
  distanceCovered,
  id,
  image,
  challenge,
  visibility,
  type,
}) => {
  const [skip, setSkip] = useState(true);
  // Toolkit
  const { isSuccess, data, isLoading } = useTrophyVisibilityQuery(
    {
      trophy_id: id,
      visibility: visibility == "public" ? "private" : "public",
    },
    { skip }
  );
  // Toaster
  const [api, contextHolder] = notification.useNotification();

  const handleVisibility = () => {
    setSkip(true);
    setSkip(false);
  };

  useEffect(() => {
    if (isSuccess) {
      api.info({
        message: `Notification`,
        description: <Paragraph text={capitalizeWords(data?.message)} color={"text-primary"} />,
        placement: "top",
        duration: 2,
      });
      if (window) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }, [isSuccess]);
  return (
    <div className="trophy__card">
      {contextHolder}
      <div className="trophy__titles-wrapp">
        <Image
          src={image}
          alt="Border Rower"
          width={75}
          height={100}
          style={{ objectFit: "contain" }}
        />
        <div className="trophy__wrapp">
          <h3>{title}</h3>
          <p className="small">Distance Covered : {distanceCovered} Meters</p>
        </div>
      </div>
      <div className="trophy__info">
        <Paragraph text={`Challenge: ${challenge}`} margin={0} />
        <Paragraph
          text={`Won ${type} Trophy by covering the distance of ${distanceCovered} meters`}
          size
        />
        <Paragraph text={`Date: ${date}`} margin={0} />
      </div>
      <div className="action__btn">
        <Button
          type="primary"
          size="large"
          style={{ color: "#052148" }}
          onClick={handleVisibility}
          className="theme__btn"
        >
          {isLoading ? (
            <Spin />
          ) : visibility == "public" ? (
            "Add to Private"
          ) : (
            "Add to Public"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TrophyCard;
