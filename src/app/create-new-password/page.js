"use client";
import Image from "next/image";
import CustomHeading from "../../components/CustomHeading";
import Paragraph from "../../components/Paragraph";
import { Form, Space, Spin, notification } from "antd";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import "../../pages/Auth/ForgotPassword/index.css";
import PasswordField from "../../components/PasswordField/PasswordField";
import Link from "next/link";
import { useEffect } from "react";
import { useForgotPasswordResetMutation } from "../../features/api/AuthApi";
import { capitalizeWords } from "../../utils/utils";
import { useRouter } from "next/navigation";

const CreateNewPassword = () => {
  const router = useRouter();
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  // Toolkit Imports
  const [forgotPasswordReset, { isSuccess, error, data, isLoading }] =
    useForgotPasswordResetMutation();
  const getStoredEmail =
    typeof window !== undefined ? localStorage.getItem("recovery_email") : null;

  // On Form Submit
  const onFinish = async (values) => {
    const formValues = {
      password: values.password,
      confirm_password: values.confirm_password,
      email: getStoredEmail,
    };
    try {
      await forgotPasswordReset(formValues);
    } catch (error) {
      console.log(error, "error message");
    }
  };
  // If Success
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
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [isSuccess, api, data?.message, router]);

  // If Error
  useEffect(() => {
    if (error && error.data && error.data.errors) {
      Object.entries(error.data.errors).forEach(([fieldName, messages]) => {
        messages.forEach((message) => {
          notification.error({
            message: "Notification",
            description: (
              <Paragraph
                text={capitalizeWords(message)}
                color={"text-primary"}
              />
            ),
            placement: "topRight",
            duration: 4.5,
          });
        });
      });
    }
  }, [error]);
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
          text={"Create New Password"}
          color={"text-primary"}
          weight={700}
          fontSize={"big"}
        />
        <Paragraph
          text={"Create New Password & Strong password"}
          color={"text-primary"}
        />
        <Form
          autoComplete="off"
          onFinish={onFinish}
          style={{ marginTop: "2rem" }}
          name="reset-password"
        >
          <div>
            <PasswordField
              placeholder={"Create New Password"}
              required
              message={"new password"}
              name={"password"}
            />
            {error && error?.data?.errors && (
              <p className="error-message" style={{ marginTop: "-10px" }}>
                {error?.data?.errors?.password}
              </p>
            )}
          </div>
          <div>
            <PasswordField
              placeholder={"Confirm Password"}
              required
              message={"confirm password"}
              name={"confirm_password"}
            />
            {error && error?.data?.errors && (
              <p className="error-message" style={{ marginTop: "-10px" }}>
                {error?.data?.errors?.confirm_password}
              </p>
            )}
          </div>
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

export default CreateNewPassword;
