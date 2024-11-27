"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import CustomHeading from "../../components/CustomHeading";
import Paragraph from "../../components/Paragraph";
import { Form, Spin, notification } from "antd";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "../../pages/Auth/ForgotPassword/index.css";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "../../features/api/AuthApi";
import { capitalizeWords } from "../../utils/utils";

const ForgotPassword = () => {
  // Toolkit Imports
  const [forgotPassword, { isLoading, isSuccess, error, data }] =
    useForgotPasswordMutation();

  const [form] = Form.useForm();

  // Next Router
  const router = useRouter();
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  // On Form Submit
  const onFinish = async (values) => {
    try {
      await forgotPassword(values);
    } catch (error) {
      console.log(error, "error message");
    }
  };

  // If Success
  useEffect(() => {
    if (isSuccess) {
      api.info({
        message: `Notification`,
        description: <Paragraph text={data?.message} color={"text-primary"} />,
        placement: "top",
        duration: 2,
      });
      setTimeout(() => {
        router.push("/otp");
      }, 2000);
      localStorage.setItem("recovery_email", form.getFieldValue("email"));
    }
  }, [isSuccess, api, data?.message, form, router]);

  // If Error
  useEffect(() => {
    if (error && error?.status === 422) {
      api.error({
        message: `Notification`,
        description: error?.data && (
          <Paragraph
            text={capitalizeWords(error?.data?.errors?.email[0])}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2,
      });
    }
  }, [error,api]);

  return (
    <div className="recovery__container">
      {contextHolder}
      <div className="recovery__wrapp">
        <Link href={"/"}>
          <Image
            src={"/logo-dark.png"}
            width={256}
            height={98}
            alt="Border Rowers"
          />
        </Link>
        <CustomHeading
          text={"Forgot Password"}
          color={"text-primary"}
          weight={700}
          fontSize={"big"}
          margin={0}
        />
        <Paragraph
          text={"Recover Your Account"}
          color={"text-primary"}
          margin={0}
        />

        <Form
          onFinish={onFinish}
          autoComplete="off"
          style={{ marginTop: "2rem" }}
          form={form}
        >
          <InputField
            placeholder={"Write Your Email"}
            type={"text"}
            name={"email"}
            message={"Email"}
            required={true}
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

export default ForgotPassword;
