"use client";
import { Col, Form, Row, Spin, notification } from "antd";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import SubmitButton from "../../SubmitButton/SubmitButton";
import Paragraph from "../../Paragraph";
import { useRouter } from "next/navigation";
import PasswordField from "../../PasswordField/PasswordField";
import InputCheckbox from "../../InputCheckbox/InputCheckbox";
import Image from "next/image";
import {
  GetCityOptions,
  GetCountryOptions,
  GetStateOptions,
} from "../../../utils/regionsData";
import { useRegisterOrgMutation } from "../../../features/api/AuthApi";
import { useEffect, useState } from "react";
import { capitalizeWords } from "../../../utils/utils";

const CreateOrg = () => {
  const [form] = Form.useForm();
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

  // Toolkit
  const [registerOrg, { isLoading, error, isSuccess, data }] =
    useRegisterOrgMutation();
  // Handlers
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };

  // on Form Submission
  const onFinish = async (values) => {
    try {
      await registerOrg(values);
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

  // Checks for field validations
  // const validateAlphabets = (value, callback) => {
  //   const regex = /^[^0-9!@#$%^&*(),.?":{}|<> ]+$/;
  //   if (!regex.test(value)) {
  //     callback("Please enter only alphabets.");
  //   } else {
  //     callback();
  //   }
  // };

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
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={15}>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Organization Name"}
              type={"text"}
              required
              message={"Organization Name"}
              name={"name"}
              validator={/^[a-zA-Z\s]*$/}
            />
            {error && error?.data?.errors && error?.data?.errors?.name && (
              <p className="error-message">{handleErrors("name")}</p>
            )}
          </Col>
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Email Address"}
              type={"email"}
              required
              message={"Email Address"}
              name={"email"}
            />
            {error && error?.data?.errors && error?.data?.errors?.email && (
              <p className="error-message">{handleErrors("email")}</p>
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
              maxLength={5}
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

export default CreateOrg;
