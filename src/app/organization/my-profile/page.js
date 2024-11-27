"use client";
import { Col, Row } from "antd";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import Preheading from "../../../components/Preheading";
import Image from "next/image";
import Paragraph from "../../../components/Paragraph";
import "../../../pages/User/MyProfile/index.css";
import ThemeButton from "../../../components/ThemeButton/ThemeButton";
import { Navbar } from "../../../components";
import { useGetUserQuery } from "../../../features/api/AuthApi";
import { useEffect } from "react";
import AdminLayout from "../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";

const PersonalInfo = ({ icon, label, value }) => {
  return (
    <Col
      lg={{ span: 12 }}
      md={{ span: 12 }}
      sm={{ span: 24 }}
      xs={{ span: 24 }}
    >
      <div className="pinfo__wrapp">
        <div className="pinfo__icon">
          <Image src={icon} alt="Border Rowers" width={26} height={27} />
        </div>
        <div className="pinfo__content">
          <Paragraph
            size={true}
            text={label}
            color={"text-primary"}
            margin={0}
          />
          <Paragraph
            text={value}
            color={"text-primary"}
            margin={0}
            weight={500}
          />
        </div>
      </div>
    </Col>
  );
};
const MyProfile = () => {
  const { data, refetch } = useGetUserQuery();
  const user = data?.response?.data;
  console.log(data?.response?.data, "all done");
  typeof window !== undefined ? localStorage.setItem('userInfo', JSON.stringify(user)) : null
  useEffect(() => {
    refetch();
  }, [refetch]);
  const poersonalInfo = [
    {
      id: 1,
      label: "Name",
      value: user?.name,
      icon: "/user.svg",
    },
    {
      id: 2,
      label: "Email",
      value: user?.email,
      icon: "/email.svg",
    },
    {
      id: 3,
      label: "Country",
      value: user?.countr_name,
      icon: "/map.svg",
    },
    {
      id: 4,
      label: "State ",
      value: user?.state_name,
      icon: "/map.svg",
    },
    {
      id: 5,
      label: "City ",
      value: user?.city_name,
      icon: "/map.svg",
    },
    {
      id: 6,
      label: "Zip/postal code ",
      value: user?.zip_code,
      icon: "/map.svg",
    },
    {
      id: 7,
      label: "Street Address ",
      value: user?.address,
      icon: "/map.svg",
    },
  ];
  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <DashboardTitle title={"My Profile"} />
        <Row gutter={[10, 10]} align={"middle"}>
          <Col lg={{ span: 20 }} md={{ span: 20 }} sm={{ span: 24 }}>
            <Preheading
              text={"Personal Information"}
              weight={600}
              margin={0}
              textTransform={"capitalize"}
              color={"text-primary"}
            />
          </Col>
          <Col lg={{ span: 4 }} md={{ span: 4 }} sm={{ span: 24 }}>
            <ThemeButton text={"Edit"} route={"/organization/edit-profile"} />
          </Col>
        </Row>
        <Row>
          {poersonalInfo && poersonalInfo.length > 0
            ? poersonalInfo?.map((info) => (
                <PersonalInfo
                  key={info?.id}
                  icon={info?.icon}
                  label={info?.label}
                  value={info?.value}
                />
              ))
            : "Not Found"}
        </Row>
        <Preheading
          text={"Password"}
          weight={600}
          textTransform={"capitalize"}
          color={"text-primary"}
        />
        <Row>
          <Col
            lg={{ span: 17 }}
            md={{ span: 17 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <PersonalInfo
              icon={"/lock.svg"}
              label={"Password"}
              value={"••••••••••••••••••"}
            />
          </Col>
          <Col
            lg={{ span: 7 }}
            md={{ span: 7 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <ThemeButton
              text={"Change Password"}
              route={"/organization/change-password"}
            />
          </Col>
        </Row>
      </AdminLayout>
    </>
  );
};

export default MyProfile;
