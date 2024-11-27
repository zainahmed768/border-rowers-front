import Image from "next/image";
import "./index.css";
import ThemeButton from "../../../../ThemeButton/ThemeButton";
import { Button, Modal } from "antd";
import {  useState } from "react";
import Preheading from "../../../../Preheading";
import Paragraph from "../../../../Paragraph";
import SelectField from "../../../../SelectField/SelectField";
import InputField from "../../../../InputField/InputField";
import SubmitButton from "../../../../SubmitButton/SubmitButton";
import { usePathname } from "next/navigation";

const TeamCardSingle = ({
  image,
  name,
  score,
  isCaptian,
  isOrg,
  asCaptian,
  // pass,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const options = [
    {
      value: "Select Reaction 1",
      label: "Select Reaction 1",
    },
    {
      value: "Select Reaction 2",
      label: "Select Reaction 2",
    },
  ];
  const captiancyOptions = [
    {
      value: "Select Team Member 1",
      label: "Select Team Member 1",
    },
    {
      value: "Select Team Member 2",
      label: "Select Team Member 2",
    },
    {
      value: "Select Team Member 3",
      label: "Select Team Member 3",
    },
    {
      value: "Select Team Member 4",
      label: "Select Team Member 4",
    },
  ];

  const teamAsCaptian = usePathname();
  return (
    <>
      <div
        className={`team__card-single ${
          isCaptian ? "bg-secondary" : ""
        } team_as_captian`}
      >
        <div className="member__img">
          <Image
            src={image}
            alt="Border Rowers"
            height={isOrg ? 49 : 80}
            width={isOrg ? 49 : 80}
          />
          {isCaptian && (
            <Image
              src={"/my-team/captain.svg"}
              width={30}
              height={30}
              alt="Border Rowers"
              className="captian__badge"
            />
          )}
        </div>
        <div className="members__info">
          {isCaptian && <p className="isCaptian">Team Captain</p>}
          <h3 className="member__name">{name}</h3>
          <h2 className="member__score">{score}</h2>
        </div>
        {isCaptian && teamAsCaptian ? (
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              border: "0",
              padding: "10px 0",
              height: "45px",
            }}
            onClick={showModal}
          >
            Leave
          </Button>
        ) : (
          <ThemeButton text={"Remove"} />
        )}
        {asCaptian && !teamAsCaptian && <ThemeButton text={"Remove"} />}
        {!isCaptian && !asCaptian && !teamAsCaptian && <ThemeButton text={"Leave"} />}
        {/* {isCaptian ? (
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              border: "0",
              padding: "10px 0",
              height: "45px",
            }}
            onClick={showModal}
          >
            Leave
          </Button>
        ) : (
          asCaptian && <ThemeButton text={"Remove"} />
        )} */}
      </div>

      <Modal
        footer={null}
        title={<Preheading text={"Leave Challenge"} color={"text-primary"} />}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Paragraph
          text={
            "we're sorry to hear that you've decided to cancle you participation in challenge as a team captian. In order to leave the challenge you will have to assign a captian"
          }
          color={"text-primary"}
        />
        <SelectField options={options} defaultValue={"Select Reaction"} />
        <InputField type={"text"} placeholder={"Write Your Feedback"} />
        <SelectField
          options={captiancyOptions}
          defaultValue={"Assign Captiancy To"}
        />
        <SubmitButton
          text={"Submit"}
          isLight={false}
          style={{ width: "100%", maxWidth: "100%" }}
          type="submit"
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default TeamCardSingle;
