"use client";
import { Col, Row, Tabs } from "antd";
import Paragraph from "../../components/Paragraph";
import Image from "next/image";
import CustomHeading from "../../components/CustomHeading";
import "../../pages/Auth/Login/login.css";
import AuthSide from "../../components/AuthSide/AuthSide";
import Link from "next/link";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../features/api/AuthApi";

const Login = () => {
  // Toolkit Imports
  const [
    login,
    {
      data: userData,
      isLoading: userLoading,
      isSuccess: userSuccess,
      error: userError,
    },
  ] = useLoginMutation();

  // Handlers
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };

  return (
    <div className="auth__wrapp">
      <Row align={"middle"} style={{ height: "100vh" }}>
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
                  alt="Borde Rower"
                  width={256}
                  height={98}
                />
              </Link>
              <CustomHeading
                text={"welcome back"}
                color={"text-primary"}
                weight={700}
                margin={0}
                fontSize={"big"}
              />
              <Paragraph
                text={"Hello again, you’ve been missed."}
                color={"text-primary"}
                margin={0}
              />
            </div>
            <LoginForm
              type={"user"}
              data={userData}
              isLoading={userLoading}
              isSuccess={userSuccess}
              error={userError}
              method={login}
            />

            {/* <div className="orWith">
              <hr />
              <p>Or With</p>
              <hr />
            </div>
            <div className="btns__group">
              <button className="social__login">
                <Image
                  src={"/google.svg"}
                  alt="Border Rower"
                  width={24}
                  height={24}
                />
                <span>Google</span>
              </button>
              <button className="social__login">
                <Image
                  src={"/facebook.svg"}
                  alt="Border Rower"
                  width={24}
                  height={24}
                />
                <span>Facebook</span>
              </button>
            </div> */}
            <div className="text__group" style={{ marginTop: "20px" }}>
              <Paragraph
                text={"Don’t have an account ?"}
                Textcolor={"#999EA1"}
                margin={0}
              />
              <div
                className="event"
                style={{ cursor: "pointer" }}
                onClick={() => handleRoute("/sign-up")}
              >
                <Paragraph
                  text={"Sign Up"}
                  color={"text-primary"}
                  margin={0}
                  weight={600}
                />
              </div>
            </div>
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

export default Login;
