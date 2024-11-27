import { Col, Modal, Row } from "antd";
import "./index.css";
// import "../../../../app/globals.css"
import Preheading from "../../../Preheading";
import CustomHeading from "../../../CustomHeading";
import Paragraph from "../../../Paragraph";
import InputCheckbox from "../../../InputCheckbox/InputCheckbox";
import Button from "../../../Button";
import ModalPopup from "../../../ModalPopup/ModalPopup";
import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";

const ChallengeRules = ({
  title,
  guidline,
  price,
  id,
  startDate,
  endDate,
  isSubscribed,
}) => {
  const getLoggedInState = getCookie("token");
  const getUserRole = getCookie("role");
  // const getLoggedInState = useSelector(
  //   (state) => state?.AuthReducer?.isLoggedIn
  // );
  // const getUserRole = useSelector((state) => state?.AuthReducer?.user?.role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errMessage, setErrMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const showModal = () => {
    // commenting on request of client
    // if (!isChecked) {
    //   setErrMessage(true);
    // } else if (!getLoggedInState) {
    //   setIsLoading(true);
    // } else {
    //   setIsModalOpen(true);
    //   setErrMessage(false);
    // }
    // commenting on request of client

    setIsModalOpen(true);

    // set data to local storage
    localStorage.setItem(
      "challengeDetails",
      JSON.stringify({
        challenge_id: id,
        participation_type: 0,
        title,
        price,
        startDate,
        endDate,
      })
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsLoading(false);
  };

  // const handleChange = (e) => {
  //   setIsChecked(e.target.checked);
  // };
  const filteredrules = guidline
    ?.map((item) => (item !== "\n" ? item : null))
    ?.filter(Boolean);
  return (
    <div className="ChallengeRules">
      <div className="container">
        <Col lg={{ span: 18 }}>
          <Preheading
            text={"important Rules & Guildelines"}
            color={"text-primary"}
          />
          <CustomHeading
            text={`${title} Challenge Rules & Guidelines`}
            color={"text-primary"}
            weight={700}
          />
        </Col>
        <div className="rules__list">
          <Row gutter={30} align={"middle"}>
            {filteredrules &&
              filteredrules.length > 0 &&
              filteredrules?.map((rule, i) => (
                <Col lg={{ span: 12 }} key={i}>
                  <Paragraph text={rule} color={"text-primary"} />
                </Col>
              ))}
          </Row>
        </div>
        <div className="rules__footer">
          <Row align={"middle"} gutter={20}>
            {/* <Col lg={{ span: 12 }}>
              <InputCheckbox
                label={"I will Follow All the Rules"}
                onchange={handleChange}
              />
              {errMessage && (
                <p className="error-message">
                  {"Please Read and Accept the Rules & Guidelines"}
                </p>
              )}
            </Col> */}
            <Col lg={{ span: 12 }}>
              <Row gutter={[20, 20]}>
                <Col lg={{ span: 11 }}>
                  <button
                    className={`btn-main bg-secondary`}
                    onClick={showModal}
                  >
                    <span className="btn__text">
                      {"Subscribe for Challenge "}
                    </span>
                    <span className="btn__icon">
                      <Image
                        src={"/icon _arrow-left.svg"}
                        width={15}
                        height={14}
                        alt="Border Rowers"
                      />
                    </span>
                  </button>
                  {/* Show If Not Logged In  */}
                  {/* <Modal
                    title={
                      <Preheading
                        text={"You Are Not Logged In"}
                        textAlign={"center"}
                      />
                    }
                    open={isLoading}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    
                    <div style={{ textAlign: "center" }}>
                      <Image src={"/wallet.svg"} height={200} width={200} />
                      <Button
                        isLight={false}
                        text={"Sign In Now"}
                        route={"/login?redirect=challenge-subscription"}
                        style={{ margin: "1rem auto" }}
                      />
                    </div>
                  </Modal> */}
                  {/* Show if Logged in  */}
                  <ModalPopup
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    preHead={
                      getUserRole == "organization"
                        ? "Organizations can not subscribe to the challenge"
                        : "Download Our application"
                    }
                    heading={
                      getUserRole == "organization"
                        ? ""
                        : "download Our application to get the most out of border rowers"
                    }
                    para={
                      getUserRole == "organization"
                        ? ""
                        : "Looking for a new and exciting way to stay active and challenge yourself? Download our rowing application today and join a community of rowers from around the world who are passionate about indoor rowing!"
                    }
                    isFooter={getUserRole == "organization" ? false : true}
                    params={
                      getUserRole == "organization"
                        ? null
                        : { challenge_id: id, participation_type: 0 }
                    }
                  />
                  {/* Show if Logged in  */}
                </Col>
                <Col lg={{ span: 13 }}>
                  <Paragraph
                    text={"Challenge Fee"}
                    color={"text-primary"}
                    margin={0}
                  />
                  <h4 className="challenge__fee" style={{ margin: 0 }}>
                    {price == 0 ? "Free" : `$${price}`}
                  </h4>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ChallengeRules;
