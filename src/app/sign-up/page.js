"use client";

import { Col, Row, Tabs } from "antd";
import AuthSide from "../../components/AuthSide/AuthSide";
import "../../pages/Auth/Login/login.css";
import CreateUser from "../../components/Pages/CreateUser/CreateUser";
import CreateOrg from "../../components/Pages/CreateOrg/CreateOrg";
import CustomHeading from "../../components/CustomHeading";
import Image from "next/image";
import Paragraph from "../../components/Paragraph";
import Link from "next/link";

const tabItems = [
  {
    key: "1",
    label: `Participant`,
    children: <CreateUser />,
  },
  {
    key: "2",
    label: `Organization`,
    children: <CreateOrg />,
  },
];

const SignUp = () => {
  return (
    <div className="auth__wrapp">
      <Row align={"middle"}>
        <Col
          lg={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className="auth__container">
            <div className="auth__head">
              <Link href={"/"}>
                <Image
                  src={"/logo-dark.png"}
                  width={256}
                  height={98}
                  alt="Border Rowers"
                />
              </Link>
              <CustomHeading
                text={"Create A new User"}
                color={"text-primary"}
                weight={700}
                margin={"20px 0 0 0"}
                fontSize={"big"}
              />
              <Paragraph
                text={
                  "Welcome To Border rowers please enter details to create a new account"
                }
                color={"text-primary"}
                margin={0}
              />
            </div>
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              className="full__w-tabs"
            />
          </div>
        </Col>
        <Col
          lg={{ span: 14 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          style={{ alignSelf: "stretch" }}
        >
          <AuthSide />
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
