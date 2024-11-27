import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Col, Modal, Row, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import ModalPopup from "../ModalPopup/ModalPopup";
import Preheading from "../Preheading";
import { useChallengeSubscriptionMutation } from "../../features/api/subscriptionApi";
import Paragraph from "../Paragraph";
import { useRouter } from "next/navigation";
import { capitalizeWords } from "../../utils/utils";

const SubscriptionForm = () => {
  const [
    challengeSubscription,
    { data, isLoading: subscriptionLoading, error, isSuccess },
  ] = useChallengeSubscriptionMutation();
  const router = useRouter();
  // Toaster
  const [api, contextHolder] = notification.useNotification();

  // Strip Elements
  const stripe = useStripe();
  const elements = useElements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Card Appearance and options
  const cardElemOptions = {
    // amount : 23,
    style: {
      base: {
        color: "#052148",
        fontFamily: "Poppins, sans-serif",
      },
    },
  };

  // ************* Get Challenge From Local Storage ************* //
  const getInfo =
    typeof window !== undefined
      ? window.localStorage.getItem("challengeDetails")
      : null;
  const parseInfo = JSON.parse(getInfo);

  // ************* Handle For Free Challenge ************* //
  const handleFreeChallenge = async () => {
    try {
      const formData = new FormData();
      formData.append("challenge_id", parseInfo?.challenge_id);
      formData.append("stripeToken", null);
      formData.append("participation_type", parseInfo?.participation_type);
      formData.append("meter_image", parseInfo?.imageFile);

      await challengeSubscription(formData);
    } catch (error) {
      console.log(error);
    }
  };

  // ************* Handle For Paid Challenge ************* //
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return <Spin />;
    }

    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);
    // console.log("check", payload);
    if (!cardElement) {
      console.error("Card element not found");
      return;
    }
    // Clear any previous errors
    setPaymentError(null);

    // Perform form validation here
    if (!cardElement._complete) {
      setPaymentError("Please Enter Correct Card Information.");
      return;
    }

    setIsLoading(true);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error:", error);
        setPaymentError(error.message);
      } else {
        if (payload?.token?.id) {
          const formData = new FormData();
          formData.append("challenge_id", parseInfo?.challenge_id);
          formData.append("stripeToken", payload?.token?.id);
          formData.append("participation_type", parseInfo?.participation_type);
          formData.append("meter_image", parseInfo?.imageFile);

          await challengeSubscription(formData);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  // if Error
  useEffect(() => {
    if (error?.data) {
      typeof error?.data?.message == "object"
        ? Object.entries(error.data.message).forEach(
            ([fieldName, messages]) => {
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
            }
          )
        : notification.error({
            message: "Notification",
            description: (
              <Paragraph
                text={capitalizeWords(error?.data?.message)}
                color={"text-primary"}
              />
            ),
            placement: "topRight",
            // duration: 4,
          });
    }
  }, [error]);

  // if success
  useEffect(() => {
    if (isSuccess && data?.message) {
      setIsModalOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      {contextHolder}
      {parseInfo?.price == 0 ? (
        <Row gutter={20}>
          <Col span={24}>
            <button
              type="submit"
              disabled={!stripe}
              style={{ marginTop: "1rem" }}
              onClick={handleFreeChallenge}
            >
              Subscribe Challenge
            </button>
          </Col>
        </Row>
      ) : (
        <form onSubmit={handleSubmit}>
          <Row gutter={20}>
            <Col span={24}>
              <CardElement options={cardElemOptions} className="card-elem" />
              {paymentError && (
                <div style={{ color: "red" }}>{paymentError}</div>
              )}
            </Col>
            <Col span={24}>
              <button
                type="submit"
                disabled={!stripe}
                style={{ marginTop: "1rem" }}
              >
                Pay Now
              </button>
            </Col>
          </Row>
        </form>
      )}

      {/* Preloader */}
      <Modal
        title={
          <Preheading text={"Processing Your Payment"} textAlign={"center"} />
        }
        open={isLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      </Modal>

      <ModalPopup
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        isPayment={true}
        image={"/wallet.svg"}
        preHead={"Payment Successful "}
        heading={"Thank You! for participating"}
        para={
          "We are delighted to inform you that you have successfully participated  in our upcoming event. we are confident that your involvement will make this event even more memorable."
        }
      />
    </>
  );
};

export default SubscriptionForm;
