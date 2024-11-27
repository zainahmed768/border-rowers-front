"use client";
import { Spin, notification } from "antd";
import { Navbar } from "../../../components";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import Image from "next/image";
import { useEffect, useState } from "react";
import Preheading from "../../../components/Preheading";
import Paragraph from "../../../components/Paragraph";
import { useUpdateMeterImageMutation } from "../../../features/api/GetUserStuff";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { useRouter } from "next/navigation";

const UpdateStatus = () => {
  const router = useRouter();
  const [meterImage, setMeterImage] = useState([]);
  // console.log(meterImage[0], "meterimage");
  const [api, contextHolder] = notification.useNotification();
  const [updateMeterImage, { isLoading, error, data, isSuccess }] =
    useUpdateMeterImageMutation();
  // open notification when image is not uploaded
  const openNotification = () => {
    api.error({
      message: `Notification`,
      description: (
        <Paragraph
          text={"Updated Meter Image is Required!"}
          color={"text-primary"}
        />
      ),
      placement: "top",
      duration: 2.3,
    });
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", meterImage[0]);
      await updateMeterImage(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // Show API Success Notification
      api.info({
        message: `Notification`,
        description: <Paragraph text={data?.message} color={"text-primary"} />,
        placement: "top",
        duration: 2.3,
      });

      setTimeout(() => {
        router.push("/user/my-challenges");
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      // Show API Error Notification
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={error?.data?.message?.image || error?.data?.message}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        <DashboardTitle title={"Update Status"} />
        <Preheading text={"Please Upload Updated Meter Image"} />
        <ImageUpload
          coverImage={meterImage[0]}
          setCoverImage={(file) => setMeterImage(file, 0)}
          name={"meter_image"}
          imageId={0}
        />
        {/* <Button text={"Submit"} isLight={false} route={"/payment"} /> */}
        <button
          className={`btn-main bg-secondary`}
          onClick={!meterImage.length > 0 ? openNotification : handleSumit}
          // disabled={!fileList.length > 0 ? true : false}
        >
          {/* <span className="btn__text">{isLoading ? <Spin /> : "Submit"}</span> */}
          <span className="btn__text">{isLoading ? <Spin /> : "Submit"}</span>
          <span className="btn__icon">
            <Image
              src={"/arrow-right.svg"}
              width={15}
              height={14}
              alt="Border Rowers"
            />
          </span>
        </button>
      </UserLayout>
    </>
  );
};

export default UpdateStatus;
