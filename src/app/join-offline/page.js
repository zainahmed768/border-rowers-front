"use client";
import { Col, Row, Spin, notification } from "antd";
import Preheading from "../../components/Preheading";
import CustomHeading from "../../components/CustomHeading";
import Paragraph from "../../components/Paragraph";
import "../../pages/JoinOffline/index.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { Footer, Navbar } from "../../components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUploadImageMutation } from "../../features/api/subscriptionApi";
import { capitalizeWords } from "../../utils/utils";

const JoinOffline = () => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState(null);
  const router = useRouter();
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  // Toolkit Imports
  const [uploadImage, { data, isSuccess, error, isLoading }] =
    useUploadImageMutation();

  // open notification when image is not uploaded
  const openNotification = () => {
    api.error({
      message: `Notification`,
      description: (
        <Paragraph text={"Meter Image is Required!"} color={"text-primary"} />
      ),
      placement: "top",
      duration: 2.3,
    });
  };

  // On Form Submit
  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file || null);
      formData.append("path", "meter-image");
      if (file !== null) {
        await uploadImage(formData);
      }
    } catch (error) {
      console.log(error);
    }

    if (file == null) {
      router.push("/payment");
    }
  };

  // if Error
  useEffect(() => {
    if (error?.data) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={capitalizeWords(error?.data?.message?.image[1])}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });
    }
  }, [error]);

  // if success
  useEffect(() => {
    if (isSuccess && file !== null) {
      // api.info({
      //   message: `Notification`,
      //   description: (
      //     <Paragraph
      //       text={capitalizeWords(data?.message)}
      //       color={"text-primary"}
      //     />
      //   ),
      //   placement: "top",
      //   duration: 2.3,
      // });

      // Redirect to payment Page
      setTimeout(() => {
        router.push("/payment");
      }, 2000);
    }
  }, [isSuccess]);

  const imageFile = data?.response?.data || null;
  const getChallengeStorage =
    typeof window !== undefined
      ? window.localStorage.getItem("challengeDetails")
      : null;
  const parseChellenge = JSON.parse(getChallengeStorage);
  const meterImage = { ...parseChellenge, imageFile };
  localStorage.setItem("challengeDetails", JSON.stringify(meterImage));

  return (
    <>
      {contextHolder}
      <Navbar isLight={false} logo={"/logo-dark.png"} />
      <div className="JoinOffline">
        <div className="container">
          <Row>
            <Col lg={{ span: 12 }}>
              <Preheading text={"Join Offline"} color={"text-primary"} />
              <CustomHeading
                text={"You have joined River Challenge Offline"}
                color={"text-primary"}
                weight={700}
              />
              <div className="joining__features">
                <Paragraph
                  text={"Start Rowing the Meter"}
                  color={"text-primary"}
                />
                <Paragraph
                  text={"Take a photo of the PM5 Monitor"}
                  color={"text-primary"}
                />
                <Paragraph
                  text={"Submit it in the meter dump"}
                  color={"text-primary"}
                />
              </div>
            </Col>
            <Col lg={{ span: 12 }}>
              <CustomHeading
                text={"Upload Image"}
                color={"text-primary"}
                weight={700}
                margin={0}
              />
              <FileUpload
                limit={1}
                fileList={fileList}
                setFileList={setFileList}
                setFile={setFile}
              />
              {/* <Button text={"Submit"} isLight={false} route={"/payment"} /> */}
              <button
                className={`btn-main bg-secondary`}
                // onClick={!fileList.length > 0 ? openNotification : handleSumit}
                onClick={handleSumit}
                // disabled={!fileList.length > 0 ? true : false}
              >
                <span className="btn__text">
                  {isLoading ? <Spin /> : "Submit"}
                </span>
                <span className="btn__icon">
                  <Image
                    src={"/arrow-right.svg"}
                    width={15}
                    height={14}
                    alt="Border Rowers"
                  />
                </span>
              </button>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JoinOffline;
