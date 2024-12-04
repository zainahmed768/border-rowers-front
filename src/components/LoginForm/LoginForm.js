"use client";
import { Col, Form, Row, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import PasswordField from "../PasswordField/PasswordField";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import Paragraph from "../Paragraph";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/reducers/AuthReducer";
import { setCookie } from "cookies-next";
import { capitalizeWords } from "../../utils/utils";
import axios from "axios";

const LoginForm = ({ data, isLoading, isSuccess, error, method }) => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  // Handlers
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get("redirect");

  const handleRoute = (route) => {
    router.push(route);
  };

  const handleRemember = (e) => {
    setRememberMe(e.target.checked);
  };

  // On Form Submit
  const onFinish = async (values) => {
    console.log(values, "sdhcbs");

    try {
      await method(values);

      // Remember Me Logic
      if (rememberMe) {
        localStorage.setItem(
          "credentials",
          JSON.stringify({
            email: values.email,
            password: values.password,
          })
        );
      }
    } catch (error) {
      console.log("error");
      api.error({
        message: `Notification`,
        description: (
          <Paragraph text={"Network Error"} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2,
      });
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "post",
  //     url: "https://admin.borderrowers.com/api/v1/user/auth/login?type=user-login",
  //     data: {
  //       email: user?.email,
  //       password: user?.password,
  //     },
  //   }).then(function (response) {
  //     console.log(response, "all res");
  //   });
  // };
  // If Success
  useEffect(() => {
    if (isSuccess) {
      api.info({
        message: `Notification`,
        description: (
          <Paragraph text={"Successfully Logged In!"} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2,
      });

      if (params == "challenge-subscription" || params == "leaderboard") {
        setTimeout(() => {
          router.back();
        }, 1500);
      }

      setTimeout(() => {
        router.push("/");
      }, 1500);

      // if (data?.response?.data?.user?.role == "user") {
      //   setTimeout(() => {
      //     router.push("/user/my-profile");
      //   }, 1500);
      // } else {
      //   setTimeout(() => {
      //     router.push("/organization");
      //   }, 1500);
      // }
      console.log(data, "response login", data?.response?.data?.token);
      dispatch(
        setUser({
          token: data?.response?.data?.token,
          user: data?.response?.data?.user,
        })
      );
      localStorage.setItem("modal", true);
      setCookie("token", data?.response?.data?.token);
      setCookie("role", data?.response?.data?.user?.role);
    }
  }, [isSuccess, data]);

  // If Error
  useEffect(() => {
    if (error || error?.status === 422) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={
              error?.data?.errors?.email
                ? capitalizeWords(error?.data?.errors?.email[0])
                : capitalizeWords(error?.data?.message)
            }
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2,
      });
    }
  }, [error]);

  // Get Credentials
  useEffect(() => {
    const loginCreds =
      typeof window !== undefined
        ? window.localStorage.getItem("credentials")
        : null;
    const parsedData = JSON.parse(loginCreds);

    form.setFieldsValue({
      email: parsedData?.email,
      password: parsedData?.password,
    });
  }, []);

  return (
    <>
      {contextHolder}
      {/* <input
        type="email"
        value={user?.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        value={user?.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>submit</button>
      */}
      <Form
        name={"login-form"}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <InputField
          placeholder={"Write Your Email"}
          type={"text"}
          name={"email"}
          message={"Email"}
          required={true}
        />
        <PasswordField
          placeholder={"Password"}
          required
          message={"Password!"}
          name={"password"}
        />
        <Row align={"middle"} style={{ marginBottom: "10px" }}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
          >
            <InputCheckbox
              name={"remember"}
              label={"Remember Me"}
              onchange={handleRemember}
            />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
          >
            <div
              onClick={() => handleRoute("/forgot-password")}
              style={{ cursor: "pointer" }}
            >
              <Paragraph
                text={"Forgot Password"}
                Textcolor={"#FB344F"}
                textAlign={"right"}
                margin={"0"}
              />
            </div>
          </Col>
        </Row>
        <SubmitButton
          text={isLoading ? <Spin /> : "Sign in Now"}
          isLight={false}
          style={{ width: "100%", maxWidth: "100%" }}
          type={"submit"}
        />
      </Form>
    </>
  );
};

export default LoginForm;
