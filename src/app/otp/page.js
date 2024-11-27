"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomHeading from "../../components/CustomHeading";
import Paragraph from "../../components/Paragraph";
import { Form, Spin, notification } from "antd";
import OTPInput from "react-otp-input";
import "../../pages/Auth/ForgotPassword/index.css";
import "../../pages/Auth/Otp/index.css";
import Link from "next/link";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useVerifyOtpMutation } from "../../features/api/AuthApi";
import { useRouter } from "next/navigation";
import { capitalizeWords } from "../../utils/utils";
const Otp = () => {
  // States
  const [otp, setOtp] = useState("");

  const router = useRouter();

  // Toolkit Imports
  const [verifyOtp, { isLoading, isSuccess, error, data }] =
    useVerifyOtpMutation();

  // Toaster
  const [api, contextHolder] = notification.useNotification();

  // On Form Submit
  const onFinish = async () => {
    try {
      await verifyOtp({ otp });
    } catch (error) {
      console.log(error, "error message");
    }
  };
  // If Success
  useEffect(() => {
    if (isSuccess) {
      api.info({
        message: `Notification`,
        description: <Paragraph text={capitalizeWords(data?.message)} color={"text-primary"} />,
        placement: "top",
        duration: 2,
      });
      setTimeout(() => {
        router.push("/create-new-password");
      }, 2000);
    }
  }, [isSuccess]);
  // If Error
  useEffect(() => {
    if (error && error?.status === 422) {
      api.error({
        message: `Notification`,
        description: error?.data && (
          <Paragraph text={capitalizeWords(error?.data?.errors?.otp[0])} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2,
      });
    }
  }, [error]);

  return (
    <div className="recovery__container">
      {contextHolder}
      <div className="recovery__wrapp otp__wrapp">
        <Link href={"/"}>
          <Image
            src={"/logo-dark.png"}
            width={256}
            height={98}
            alt="Border Rowers"
          />
        </Link>
        <CustomHeading
          text={"Enter Code"}
          color={"text-primary"}
          weight={700}
          fontSize={"big"}
          margin={0}
        />
        <Paragraph
          text={"Enter OTP To Create New Password"}
          color={"text-primary"}
          margin={0}
        />

        <Form
          autoComplete="off"
          onFinish={onFinish}
          style={{ marginTop: "2rem" }}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} className="otp__input" type="number"/>}
          />
          <SubmitButton
            text={isLoading ? <Spin /> : "Submit"}
            isLight={false}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        </Form>
      </div>
    </div>
  );
};

export default Otp;
