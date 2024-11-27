"use client";
import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import { Navbar } from "../../../components";
import { Col, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import Preheading from "../../../components/Preheading";
import Button from "../../../components/Button";
import {
  useDeleteAccountMutation,
  useVerifyOtpDeleteAccountMutation,
} from "../../../features/api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { Form, Spin, notification } from "antd";
import OTPInput from "react-otp-input";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import "../../../pages/Auth/Otp/index.css";
import Paragraph from "../../../components/Paragraph";
import { capitalizeWords } from "../../../utils/utils";
import { userLogout } from "../../../features/reducers/AuthReducer";
import { deleteCookie } from "cookies-next";
import { persistStore } from "redux-persist";
import store from "../../../store/store";
const DeleteAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [otp, setOtp] = useState("");
  const [response, setResponse] = useState(null);
  const [showOtp, setShowOtp] = useState(
    JSON.parse(localStorage.getItem("delete")) || false
  );

  const getUser = useSelector((state) => state?.AuthReducer?.user);

  const [deleteAccount, { isLoading: deleteLoading }] =
    useDeleteAccountMutation();
  const [verifyOtp, { isLoading: otpLoading, isSuccess, error, data }] =
    useVerifyOtpDeleteAccountMutation();

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(getUser?.id).unwrap();
      setResponse(response);
      console.log("Response:", response);
      if (response?.statusCode === 200) {
        setShowOtp(true);
        localStorage.setItem("delete", JSON.stringify(true));
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const onFinish = async () => {
    try {
      await verifyOtp({ otp });
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
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
      //   logout();
      dispatch(userLogout());
      persistStore(store).purge();
      deleteCookie("role");
      deleteCookie("token");
      localStorage.clear("modal");
      localStorage.clear("delete");
      localStorage.clear("userInfo");
      localStorage.clear("persist:root");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error?.status === 422) {
      api.error({
        message: `Notification`,
        description: error?.data?.errors?.otp[0] && (
          <Paragraph
            text={capitalizeWords(error?.data?.errors?.otp[0])}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2,
      });
    }
  }, [error]);

  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        <Row align="middle">
          <Col lg={22} md={22} sm={22} xs={22}>
            <DashboardTitle title="Delete Account" />
          </Col>
          <Col lg={2} md={2} sm={2} xs={2}>
            <ArrowLeftOutlined
              style={{
                fontSize: "30px",
                color: "var(--primary-color)",
                cursor: "pointer",
              }}
              onClick={() => router.back()}
            />
          </Col>
        </Row>

        {!showOtp && (
          <Row align="middle">
            <Col lg={22} md={22} sm={22} xs={22}>
              <Preheading
                text="Are you sure you want to delete this Account!"
                textAlign="center"
              />
              <Button
                text="Yes"
                isLight={false}
                style={{ textAlign: "center", margin: "0px auto" }}
                onClick={handleDeleteAccount}
                loading={deleteLoading}
              />
            </Col>
          </Row>
        )}

        {showOtp && (
          <Row align="middle">
            <Col
              lg={16}
              md={22}
              sm={22}
              xs={22}
              offset={3}
              style={{ paddingTop: "30px" }}
            >
              <Paragraph
                text="Enter the OTP to confirm account deletion."
                textAlign="center"
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
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="otp__input"
                      style={{ marginRight: "4px", textAlign: "center" }}
                      type="number"
                    />
                  )}
                />
                <SubmitButton
                  text={otpLoading ? <Spin /> : "Submit"}
                  isLight={false}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    marginTop: "20px",
                  }}
                />
              </Form>
            </Col>
          </Row>
        )}
      </UserLayout>
    </>
  );
};

export default DeleteAccount;
