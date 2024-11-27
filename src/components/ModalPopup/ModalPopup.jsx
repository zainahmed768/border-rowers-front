"use client";
import { Modal } from "antd";
import Preheading from "../Preheading";
import CustomHeading from "../CustomHeading";
import Paragraph from "../Paragraph";
import DownloadButtons from "../DownloadButtons/DownloadButtons";
import "./index.css";
import Link from "next/link";
import Button from "../Button";
import Image from "next/image";

const ModalPopup = ({
  isModalOpen,
  handleCancel,
  preHead,
  heading,
  para,
  isFooter,
  isPayment,
  image,
}) => {
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        width={700}
        className="custom__modal"
      >
        {isPayment && (
          <Image src={image} alt="Border Rower" width={200} height={200} />
        )}
        <Preheading text={preHead} color={"text-primary"} />
        <CustomHeading text={heading} color={"text-primary"} weight={700} />
        <Paragraph text={para} color={"text-primary"} />
        {isPayment ? (
          <Button
            isLight={false}
            text={"Continue"}
            route={"/user/my-challenges"}
            style={{ margin: "1rem auto" }}
          />
        ) : (
          <DownloadButtons />
        )}
        {isFooter && (
          <>
            {/* <div className="divider">
              <hr />
              <Paragraph text={"OR"} />
              <hr />
            </div> */}
            {/* <Link
              // href={`/join-offline?challenge_id=${params?.challenge_id}&participation_type=0`}
              href={`/join-offline`}
              style={{
                margin: "1rem auto",
                display: "block",
                color: "var(--primary-color)",
                fontWeight: "500",
              }}
            >
              Join Offline Now
            </Link> */}
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalPopup;
