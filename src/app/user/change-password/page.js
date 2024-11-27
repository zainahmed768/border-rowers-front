"use client";
import { Col, Form, Row, Spin, notification } from "antd";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import Preheading from "../../../components/Preheading";
import ThemeButton from "../../../components/ThemeButton/ThemeButton";
import { Navbar } from "../../../components";
import PasswordField from "../../../components/PasswordField/PasswordField";
import { useEffect } from "react";
import { useLogoutMutation, useUpdatePasswordMutation } from "../../../features/api/AuthApi";
import Paragraph from "../../../components/Paragraph";
import { useRouter } from "next/navigation";
import { capitalizeWords } from "../../../utils/utils";
import { userLogout } from "../../../features/reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import store from "../../../store/store";
import { deleteCookie } from "cookies-next";

const ChangePassword = () => {
  const router = useRouter();
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  // Toolkit Imports
  const [resetPassword, { isSuccess, error, data, isLoading }] =
    useUpdatePasswordMutation();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  // On Form Submit
  const onFinish = async (values) => {
    try {
      await resetPassword(values);
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
      setTimeout(async () => {
        await logout();
        dispatch(userLogout());
        persistStore(store).purge();
        deleteCookie("role");
        deleteCookie("token");

        router.push("/login");
      }, 2000);
    }
  }, [isSuccess]);
  // If Error
  useEffect(() => {
    // if (error && error?.status === 422) {
    //   console.log(error, 'error')
    //   api.error({
    //     message: `Notification`,
    //     description: error?.data && (
    //       <Paragraph text={capitalizeWords(error?.data?.message)} color={"text-primary"} />
    //     ),
    //     placement: "top",
    //     duration: 2,
    //   });
    // }
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
            // duration: 4,
          });
        });
      });
    }
  }, [error]);

  // Handle Field Errors
  const handleErrors = (fieldName) => {
    if (error && error.data?.errors && error?.data?.errors[fieldName]) {
      return error?.data?.errors[fieldName].join(", ");
    }
    return null;
  };

  return (
    <>
      {contextHolder}
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        <DashboardTitle title={"My Profile"} />
        <Preheading
          text={"Change Password"}
          weight={600}
          margin={0}
          textTransform={"capitalize"}
          color={"text-primary"}
        />
        <Form style={{ marginTop: "2.5rem" }} onFinish={onFinish}>
          <Row gutter={20}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <PasswordField
                placeholder={"Enter Your Current Password"}
                required
                message={"Current Password!"}
                name={"current_password"}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.errors?.current_password && (
                  <p className="error-message">
                    {handleErrors("current_password")}
                  </p>
                )}
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <PasswordField
                placeholder={"Create New Password"}
                required
                message={"New Password!"}
                name={"password"}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.errors?.password && (
                  <p className="error-message">{handleErrors("password")}</p>
                )}
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <PasswordField
                placeholder={"Confirm New Password"}
                required
                message={"New Password!"}
                name={"confirm_password"}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.errors?.confirm_password && (
                  <p className="error-message">
                    {handleErrors("confirm_password")}
                  </p>
                )}
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <ThemeButton
                text={"Changes Password"}
                type={isLoading ? <Spin /> : "submit"}
              />
            </Col>
          </Row>
        </Form>
      </UserLayout>
    </>
  );
};

export default ChangePassword;
