import Image from "next/image";
import Paragraph from "../Paragraph";
import "./index.css";
import { useEffect, useState } from "react";
import { Col, Row, Spin, notification } from "antd";
import { usePostcardVisibilityQuery } from "../../features/api/GetUserStuff";
import { capitalizeWords } from "../../utils/utils";

export const FlipCard = ({
  id,
  date,
  title,
  distance,
  backImage,
  frontImage,
  visibility,
  description,
  isOrg,
}) => {
  // State
  const [isFlipped, setIsFlipped] = useState(false);
  const [skip, setSkip] = useState(true);

  // Toaster
  const [api, contextHolder] = notification.useNotification();

  // Toolkit
  const { isSuccess, error, data, isLoading } = usePostcardVisibilityQuery(
    {
      postcard_id: id,
      visibility: visibility == "public" ? "private" : "public",
    },
    { skip }
  );

  // Handlers
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const handleVisibility = () => {
    setSkip(true);
    setSkip(false);
  };
  useEffect(() => {
    if (isSuccess) {
      api.info({
        message: `Notification`,
        description: (
          <Paragraph
            text={capitalizeWords(data?.message)}
            color={"text-primary"}
          />
        ),
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
    <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
      {/* Toaster  */}
      {contextHolder}
      <div className="flip-card-inner">
        {/* Card Front */}
        <div className="flip-card-front">
          <div className="flip__card-img">
            <Image
              src={frontImage ? frontImage : "/post-card.png"}
              alt="Border Rowers"
              fill
              sizes="100vw"
            />
          </div>
          <div className="flip__card-content">
            <Image
              src={"/logo-thumb.png"}
              alt="Border Rowers"
              width={60}
              height={60}
            />
          </div>
        </div>
        {/* card Back  */}
        <div className="flip-card-back">
          <div className="flip__card-img">
            {backImage && (
              <Image src={backImage} alt="Border Rowers" fill sizes="100vw" />
            )}
          </div>
          <div className="flip__card-content">
            <Paragraph
              text={title}
              color={"text-white"}
              size
              weight={500}
              margin={0}
              textTransform={"capitalize"}
            />
            <Paragraph
              text={description}
              color={"text-white"}
              size
              margin={"0 0 10px 0"}
            />
            <Row align={"bottom"}>
              <Col lg={{ span: 18 }}>
                <Paragraph
                  text={"Challenge"}
                  color={"text-white"}
                  size
                  weight={500}
                  margin={0}
                />
                <Paragraph text={date} color={"text-white"} size margin={0} />
                <Paragraph
                  text={`The postcard ${isOrg ? "Will be Sent" : "has been received"} upon covering a distance of ${distance} meters`}
                  color={"text-white"}
                  size
                  margin={0}
                />
              </Col>
              <Col
                lg={{ span: 6 }}
                style={{
                  textAlign: "right",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  src={"/logo-thumb.png"}
                  alt="Border Rowers"
                  width={60}
                  height={60}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="flip__actions">
        <button onClick={handleClick}>
          <Image
            src={"/reverse.svg"}
            alt="Border Rowers"
            width={18}
            height={13}
          />
          Flip to Back
        </button>
        {!isOrg && (
          <button onClick={handleVisibility}>
            {isLoading ? (
              <Spin />
            ) : visibility == "public" ? (
              "Add to Private"
            ) : (
              "Add to Public"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlipCard;
