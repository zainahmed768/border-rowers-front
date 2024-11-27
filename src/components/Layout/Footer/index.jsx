"use client";
import { Col, Form, Input, Row, Space, Spin, notification } from "antd";
import CustomHeading from "../../CustomHeading";
import Paragraph from "../../Paragraph";
import Button from "../../Button";
import Image from "next/image";
import { navLinks } from "../../../constants";
import Link from "next/link";
import "./index.css";
import { useGetHomeContentQuery } from "../../../features/api/homeApi";
import { useEffect } from "react";
import { useNewsletterMutation } from "../../../features/api/subscriptionApi";


const Footer = () => {
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  // Toolkit
  const { data } = useGetHomeContentQuery({
    section: "site_setting",
  });
  const siteSettings = data?.response?.data;

  // Newsletter Mutation
  const [newsletter, { data: newsLetterData, error, isLoading, isSuccess }] =
    useNewsletterMutation();

  // On Form Submit
  const onFinish = async (values) => {
    try {
      await newsletter(values);
    } catch (error) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph text={"Error Posting Form Data"} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2,
      });
    }
  };

  // If Success
  useEffect(() => {
    if (isSuccess) {
      api.info({
        message: `Notification`,
        description: (
          <Paragraph text={newsLetterData?.message} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2,
      });

      form.resetFields();
    }
  }, [isSuccess]);

  // If Error
  useEffect(() => {
    if (error || error?.status === 422 || error?.status === 500) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={error && error?.data?.message?.email[0]}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2,
      });
    }
  }, [error]);
  return (
    <footer>
      {contextHolder}
      <div className="container">
        <div className="foo__top">
          <Row>
            <Col lg={{ span: 11 }} md={{ span: 11 }}>
              <CustomHeading
                text={siteSettings?.footer_scripts}
                color={"text-white"}
              />
            </Col>
            <Col lg={{ span: 2 }}></Col>
            <Col lg={{ span: 11 }} md={{ span: 11 }}>
              <Paragraph
                text={siteSettings?.footer_sentence}
                color={"text-white"}
              />
              <Button
                text={"Sign Up for Challenges"}
                isLight={false}
                style={{ marginTop: "20px" }}
                route={"/sign-up"}
              />
            </Col>
          </Row>
        </div>
        <div className="foo__middle">
          <Row align={"middle"}>
            <Col lg={{ span: 6 }} sm={{ span: 24 }}>
              <Link href={"/"}>
                <Image
                  src={siteSettings?.logo_url}
                  width={200}
                  height={79}
                  alt="Border Rower"
                />
              </Link>
            </Col>
            <Col lg={{ span: 12 }} sm={{ span: 24 }}>
              <ul className="foo__list">
                {navLinks?.map((navs) => (
                  <li key={navs?.id}>
                    <Link href={navs?.route}>{navs?.label}</Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={{ span: 6 }} sm={{ span: 24 }}>
              <Form
                className="newsletter__form"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item name="email" style={{ width: "100%" }}>
                  <Input placeholder="Join Our Newsletter" type="email" />
                </Form.Item>
                <button>
                  {isLoading ? (
                    <Spin />
                  ) : (
                    <Image
                      src={"/arrow-right.svg"}
                      width={15}
                      height={14}
                      alt="Border Rowers"
                    />
                  )}
                </button>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="foo__bottom">
          <Row>
            <Col
              lg={{ span: 8 }}
              md={{ span: 8 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <p className="foo__text">{siteSettings?.copyright}</p>
            </Col>
            <Col
              lg={{ span: 8 }}
              md={{ span: 8 }}
              style={{ textAlign: "center" }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <div className="socials">
                <Space wrap align="center">
                  {siteSettings?.facebook && (
                    <Link href={siteSettings?.facebook} target="_blank">
                      <Image
                        src={"/fb.svg"}
                        alt="Border Rower"
                        width={28}
                        height={28}
                        style={{ transform: "translateY(3px)" }}
                      />
                    </Link>
                  )}
                  {/* {siteSettings?.youtube && (
                    <Link
                      href={siteSettings?.youtube}
                      style={{
                        background: "#fff",
                        borderRadius: "50%",
                        display: "block",
                        width: "28px",
                        height: "28px",
                        textAlign: "center",
                        lineHeight: "34px",
                      }}
                    >
                      <YoutubeOutlined />
                    </Link>
                  )} */}
                  {/* {siteSettings?.pinterest && (
                    <Link
                      href={siteSettings?.pinterest}
                      target="_blank"
                      style={{
                        background: "#fff",
                        borderRadius: "50%",
                        display: "block",
                        width: "28px",
                        height: "28px",
                        textAlign: "center",
                        lineHeight: "43px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                          fill="#052148"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  )} */}
                  {siteSettings?.instagram && (
                    <Link
                      href={siteSettings?.instagram}
                      target="_blank"
                      style={{
                        background: "#fff",
                        borderRadius: "50%",
                        display: "block",
                        width: "28px",
                        height: "28px",
                        textAlign: "center",
                        lineHeight: "34px",
                      }}
                    >
                      <Image
                        src={"/insta.svg"}
                        alt="Border Rower"
                        width={28}
                        height={28}
                      />
                    </Link>
                  )}
                  {/* {siteSettings?.linkedin && (
                    <Link href={siteSettings?.linkedin} target="_blank">
                      <Image
                        src={"/linkedin.svg"}
                        alt="Border Rower"
                        width={28}
                        height={28}
                      />
                    </Link>
                  )} */}
                  {/* {siteSettings?.twitter && (
                    <Link
                      href={siteSettings?.twitter}
                      target="_blank"
                      style={{
                        background: "#fff",
                        borderRadius: "50%",
                        display: "block",
                        width: "28px",
                        height: "28px",
                        textAlign: "center",
                        lineHeight: "34px",
                      }}
                    >
                      <Image
                        src={"/twitter.svg"}
                        alt="Border Rower"
                        width={28}
                        height={28}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                        fill="#052148"
                      >
                        <path
                          d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                          fill="#052148"
                        />
                      </svg>
                    </Link>
                  )} */}
                </Space>
              </div>
            </Col>
            <Col
              lg={{ span: 8 }}
              md={{ span: 8 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <ul className="foo__list">
                <li>
                  <Link href={"/terms-and-conditions"}>Terms & condition</Link>
                </li>
                <li>
                  <Link href={"/privacy-policy"}>Privacy Policy</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
