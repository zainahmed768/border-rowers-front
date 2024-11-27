"use client";
import { Col, Form, Row, Spin, notification } from "antd";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import SubmitButton from "../../SubmitButton/SubmitButton";
import Paragraph from "../../Paragraph";
import { useRouter } from "next/navigation";
import PasswordField from "../../PasswordField/PasswordField";
import Image from "next/image";
import InputCheckbox from "../../InputCheckbox/InputCheckbox";
import { useRegisterUserMutation } from "../../../features/api/AuthApi";
import {
  GetCityOptions,
  GetCountryOptions,
  GetStateOptions,
} from "../../../utils/regionsData";
import { useEffect, useState } from "react";
import { capitalizeWords } from "../../../utils/utils";

const CreateUser = () => {
  const [selectedCountryId, setSelectedCountryId] = useState(1);
  const [selectedStateId, setSelectedStateId] = useState(1);
  // Regions
  const countryOptions = GetCountryOptions();
  const stateOptions = GetStateOptions(selectedCountryId);
  const cityOptions = GetCityOptions(selectedStateId);

  const handleCountryChange = (selectedCountryId) => {
    setSelectedCountryId(selectedCountryId);
  };

  const handleStateChange = (selectedStateId) => {
    setSelectedStateId(selectedStateId);
  };
  // Toaster
  const [api, contextHolder] = notification.useNotification();

  // Toolkit Imports
  const [registerUser, { isLoading, error, isSuccess, data }] =
    useRegisterUserMutation();

  // Handlers
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };

  // on Form Submission
  const handleSubmit = async (values) => {
    try {
      await registerUser(values);
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // Show Notification
      api.info({
        message: `Notification`,
        description: <Paragraph text={data?.message} color={"text-primary"} />,
        placement: "top",
        duration: 2.3,
      });

      // Redirect
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  }, [isSuccess]);

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
      <Form
        autoComplete={"off"}
        style={{ marginTop: "2rem" }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={15}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"First Name"}
              name={"first_name"}
              type={"text"}
              required
              message={"First Name"}
              validator={/^[a-zA-Z\s]*$/}
            />
            {error &&
              error?.data?.errors &&
              error?.data?.errors?.first_name && (
                <p className="error-message">{handleErrors("first_name")}</p>
              )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Last Name"}
              name={"last_name"}
              type={"text"}
              required
              message={"Last Name"}
              validator={/^[a-zA-Z\s]*$/}
            />
            {error && error?.data?.errors && error?.data?.errors?.last_name && (
              <p className="error-message">{handleErrors("last_name")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Email Address"}
              type={"email"}
              required
              message={"Email"}
              name={"email"}
            />
            {error && error?.data?.errors && error?.data?.errors?.email && (
              <p className="error-message">{handleErrors("email")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Contact Number"}
              required
              message={"Contact Number!"}
              name={"contact"}
              type={"number"}
            />
            {error && error?.data?.errors && error?.data?.errors?.contact && (
              <p className="error-message">{handleErrors("contact")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <SelectField
              options={countryOptions}
              onChange={handleCountryChange}
              defaultValue={"Select Country"}
              width={"100%"}
              required
              message={"Country!"}
              name={"country"}
            />
            {error && error?.data?.errors && error?.data?.errors?.country && (
              <p className="error-message">{handleErrors("country")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <SelectField
              options={stateOptions}
              onChange={handleStateChange}
              defaultValue={"Select State"}
              width={"100%"}
              required
              message={"State!"}
              name={"state"}
            />
            {error && error?.data?.errors && error?.data?.errors?.state && (
              <p className="error-message">{handleErrors("state")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <SelectField
              options={cityOptions}
              defaultValue={"Select City"}
              width={"100%"}
              required
              message={"City!"}
              name={"city"}
            />
            {error && error?.data?.errors && error?.data?.errors?.city && (
              <p className="error-message">{handleErrors("city")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Enter Zip/postal code"}
              type={"number"}
              required
              name={"zip_code"}
              message={"Zip Code"}
            />
            {error && error?.data?.errors && error?.data?.errors?.zip_code && (
              <p className="error-message">{handleErrors("zip_code")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Address"}
              type={"text"}
              required
              message={"Address"}
              name={"address"}
            />
            {error && error?.data?.errors && error?.data?.errors?.address && (
              <p className="error-message">{handleErrors("address")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <PasswordField
              placeholder={"Password"}
              required
              message={"Password"}
              name={"password"}
            />
            {error && error?.data?.errors && error?.data?.errors?.password && (
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
              placeholder={"Confirm Password"}
              required
              message={"Confirm Password"}
              name={"password_confirmation"}
            />
            {error &&
              error?.data?.errors &&
              error?.data?.errors?.password_confirmation && (
                <p className="error-message">
                  {handleErrors("password_confirmation")}
                </p>
              )}
          </Col>
        </Row>

        {/* <div className="captcha__field">
          <Row align={"middle"}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 16 }}
            >
              <InputCheckbox label={"I'm not a robot"} />
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 8 }}
              style={{ textAlign: "right" }}
            >
              <Image
                src={"/captcha.jpg"}
                alt="Border Rowers"
                width={60}
                height={60}
              />
            </Col>
          </Row>
        </div> */}
        <SubmitButton
          text={isLoading ? <Spin /> : "Sign Up Now"}
          isLight={false}
          style={{ width: "100%", maxWidth: "100%" }}
          type="submit"
        />
      </Form>
      <div className="text__group" style={{ marginTop: "1rem" }}>
        <Paragraph
          text={"Already have an account ? "}
          Textcolor={"#999EA1"}
          margin={0}
        />
        <div
          className="event"
          style={{ cursor: "pointer" }}
          onClick={() => handleRoute("/login")}
        >
          <Paragraph
            text={"Sign In"}
            color={"text-primary"}
            margin={0}
            weight={600}
          />
        </div>
      </div>
    </>
  );
};

export default CreateUser;
