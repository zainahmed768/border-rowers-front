"use client";
import { Col, Form, Row, Spin, notification } from "antd";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import UserLayout from "../../../components/Dashboards/DashboardsLayout/UserLayout/UserLayout";
import Preheading from "../../../components/Preheading";
import InputField from "../../../components/InputField/InputField";
import SelectField from "../../../components/SelectField/SelectField";
import ThemeButton from "../../../components/ThemeButton/ThemeButton";
import { Navbar } from "../../../components";
import {
  GetCityOptions,
  GetCountryOptions,
  GetStateOptions,
} from "../../../utils/regionsData";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import Paragraph from "../../../components/Paragraph";
import { useRouter } from "next/navigation";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../../../features/api/AuthApi";
import { updatedProfile } from "../../../features/reducers/AuthReducer";
import { capitalizeWords } from "../../../utils/utils";
import { ArrowLeftOutlined } from "@ant-design/icons";

const EditProfile = () => {
  const dispatch = useDispatch();
  // Toolkit
  const [editUser, { error, isSuccess, data, isLoading: updateLoader }] =
    useEditUserMutation();
  // const { data: userData, isLoading, refetch } = useGetUserQuery();
  // const user = userData?.response?.data;
  const getInfo =
    typeof window !== undefined ? localStorage.getItem("userInfo") : null;
  const userInfo = JSON.parse(getInfo);
  console.log(userInfo, "userInfo");
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  // Toaster
  const [api, contextHolder] = notification.useNotification();

  // ******* Next Router ******* //
  const router = useRouter();
  const [selectedCountryId, setSelectedCountryId] = useState(
    userInfo?.countr_id
  );
  const [selectedStateId, setSelectedStateId] = useState(userInfo?.state_id);
  // ******* Next Router ******* //

  // ******* Regions Data ******* //
  const countryOptions = GetCountryOptions();
  const stateOptions = GetStateOptions(selectedCountryId);
  const cityOptions = GetCityOptions(selectedStateId);
  // ******* Regions Data ******* //

  const handleCountryChange = (selectedCountryId) => {
    setSelectedCountryId(selectedCountryId);
  };

  const handleStateChange = (selectedStateId) => {
    setSelectedStateId(selectedStateId);
  };
  // on Form Submission
  const onFinish = async (values) => {
    const formData = {
      address: values.address,
      city: values.city.value || values.city,
      contact: values.contact,
      country: values.country.value || values.country,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      state: values.state.value || values.state,
      zip_code: values.zip_code,
    };
    try {
      await editUser(formData);
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
        router.push("/user/my-profile");
      }, 2500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && error.data && error.data.message) {
      Object.entries(error.data.message).forEach(([fieldName, messages]) => {
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
    if (error && error.data?.message && error?.data?.message[fieldName]) {
      return error?.data?.message[fieldName].join(", ");
    }
    return null;
  };

  const initialValues = {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    email: userInfo?.email,
    contact: userInfo?.contact,
    country: {
      // id: userInfo?.countr_id,
      label: userInfo?.countr_name,
      value: userInfo?.countr_id,
    },
    state: {
      // id: userInfo?.state_id,
      label: userInfo?.state_name,
      value: userInfo?.state_id,
    },
    city: {
      // id: userInfo?.city_id,
      lable: userInfo?.city_name,
      value: userInfo?.city_id,
    },
    zip_code: userInfo?.zip_code ? JSON.stringify(userInfo?.zip_code) : 0,
    address: userInfo?.address,
  };

  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <UserLayout>
        {contextHolder}
        <Row align={"middle"}>
          <Col
            lg={{ span: 22 }}
            md={{ span: 22 }}
            sm={{ span: 22 }}
            xs={{ span: 22 }}
          >
            <DashboardTitle title={"My Profile"} />
          </Col>
          <Col
            lg={{ span: 2 }}
            md={{ span: 2 }}
            sm={{ span: 2 }}
            xs={{ span: 2 }}
          >
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
        <Preheading
          text={"Edit Personal Information"}
          weight={600}
          margin={0}
          textTransform={"capitalize"}
          color={"text-primary"}
        />
        <Form
          style={{ marginTop: "2.5rem" }}
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <Row gutter={20}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <InputField
                placeholder={"John"}
                type={"text"}
                message={"First Name"}
                name={"first_name"}
                validator={/^[^0-9!@#$%^&*(),.?":{}|<> ]+$/}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.message?.first_name && (
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
                placeholder={"Doe"}
                type={"text"}
                message={"Last Name"}
                name={"last_name"}
                validator={/^[^0-9!@#$%^&*(),.?":{}|<> ]+$/}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.message?.last_name && (
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
                placeholder={"Johdoe654@gmail.com"}
                message={"Email Address"}
                type={"email"}
                name={"email"}
                disabled
              />
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <InputField
                placeholder={"+1-234-567-890"}
                type={"number"}
                message={"Contact"}
                name={"contact"}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.message?.contact && (
                  <p className="error-message">{handleErrors("contact")}</p>
                )}
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <SelectField
                options={countryOptions}
                onChange={handleCountryChange}
                width={"100%"}
                message={"Country!"}
                name={"country"}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.message?.country && (
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
                width={"100%"}
                message={"State!"}
                name={"state"}
              />
              {error && error?.data?.errors && error?.data?.message?.state && (
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
                width={"100%"}
                message={"City!"}
                name={"city"}
              />
              {error && error?.data?.errors && error?.data?.message?.city && (
                <p className="error-message">{handleErrors("city")}</p>
              )}
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <InputField
                placeholder={"Enter Zip/postal code"}
                type={"number"}
                name={"zip_code"}
                message={"Zip Code"}
              />
              {error &&
                error?.data?.errors &&
                error?.data?.message?.zip_code && (
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
                message={"Address"}
                name={"address"}
                required
              />
              {error &&
                error?.data?.errors &&
                error?.data?.message?.address && (
                  <p className="error-message">{handleErrors("address")}</p>
                )}
            </Col>
          </Row>
          <ThemeButton
            text={updateLoader ? <Spin /> : "Save Changes"}
            type={"submit"}
          />
        </Form>
      </UserLayout>
    </>
  );
};

export default EditProfile;
