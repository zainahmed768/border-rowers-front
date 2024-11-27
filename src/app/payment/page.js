"use client";
import { Col, Row } from "antd";
import "../../pages/Payment/index.css";
import Preheading from "../../components/Preheading";
import CustomHeading from "../../components/CustomHeading";
import Paragraph from "../../components/Paragraph";
import { Footer, Navbar } from "../../components";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

const PaymentHead = () => {
  const getChallengeDetail =
    typeof window !== undefined
      ? window.localStorage.getItem("challengeDetails")
      : null;
  const parseDetails = JSON.parse(getChallengeDetail);
  return (
    <div className="paymentHead">
      <Row align={"middle"}>
        <Col
          lg={{ span: 18 }}
          md={{ span: 18 }}
          sm={{ span: 18 }}
          xs={{ span: 18 }}
        >
          <Preheading
            text={"Payment Summary"}
            color={"text-secondary"}
            margin={0}
          />
          <CustomHeading
            text={parseDetails?.title}
            color={"text-primary"}
            weight={700}
            margin={0}
          />
          <Paragraph
            text={`${parseDetails?.startDate} to ${parseDetails?.endDate}`}
            color={"text-primary"}
            margin={0}
          />
        </Col>
        <Col
          lg={{ span: 6 }}
          md={{ span: 6 }}
          sm={{ span: 6 }}
          xs={{ span: 6 }}
          style={{ textAlign: "right" }}
        >
          <CustomHeading
            text={`$${parseDetails?.price == 0 ? "Free" : parseDetails?.price}`}
            color={"text-primary"}
          />
        </Col>
      </Row>
    </div>
  );
};

const Payment = () => {
  // const options = {
  //   mode: "payment",
  //   amount: 1099,
  //   currency: "usd",
  //   // Fully customizable with appearance API.
  //   appearance: {
  //     /*...*/
  //   },

  // };
  return (
    <>
      <Navbar isLight={false} logo={"/logo-dark.png"} />
      <div className="payment">
        <div className="container">
          <PaymentHead />
          <Elements stripe={stripePromise}>
            <SubscriptionForm />
          </Elements>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
