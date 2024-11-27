"use client";
import AdminLayout from "../../../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import DashboardTitle from "../../../../../components/Dashboards/DashboardTitle";
import SubTitle from "../../../../../components/SubTitle/SubTitle";
import Paragraph from "../../../../../components/Paragraph";
import { Col, Form, Modal, Row, Spin, notification } from "antd";
import Preheading from "../../../../../components/Preheading";
import InputField from "../../../../../components/InputField/InputField";
import SelfImage from "../../../../../components/SelfImage/SelfImage";
import "../../../../../pages/Organization/ViewManage/EditChallengeSingle/index.css";
import "../../../../../pages/Organization/CreateChallenges/index.css";
import Image from "next/image";
import SelectField from "../../../../../components/SelectField/SelectField";
import InputDuration from "../../../../../components/Dashboards/InputDuration/InputDuration";
import FlipBox from "../../../../../components/Dashboards/FlipBox/FlipBox";
import DateField from "../../../../../components/DateField/DateField";
import { Navbar } from "../../../../../components";
import ImageUpload from "../../../../../components/ImageUpload/ImageUpload";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEditChallengeMutation } from "../../../../../features/api/OrganizationApi";
import InputTextArea from "../../../../../components/InputTextArea/InputTextArea";
import moment from "moment";
import EditGMap from "../../../../../components/GoogleMap/EditGMap";
import { capitalizeWords } from "../../../../../utils/utils";
import { CloseCircleOutlined } from "@ant-design/icons";
import CustomHeading from "../../../../../components/CustomHeading";

const EditChallengeSingle = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  // Get Challenge Details from Local Storage
  const getDetails =
    typeof window !== undefined
      ? localStorage?.getItem("manage_challenge_details")
      : null;
  const parseDetails = getDetails ? JSON.parse(getDetails) : "";
  const presetRoutes =
    parseDetails && typeof parseDetails?.route == "string"
      ? JSON.parse(parseDetails?.route)
      : typeof parseDetails?.route == "object"
        ? parseDetails?.route
        : [];

  const params = useParams();
  const { challengeSingle } = params;
  // Toolkit Imports
  const [editChallenge, { isSuccess, error, data, isLoading }] =
    useEditChallengeMutation();
  // ********* Cover image State ********* //
  const [coverImage, setCoverImage] = useState([]);
  const [trophyImage, setTrophyImage] = useState([]);
  const [milestoneImage, setMilestoneImage] = useState([]);

  // Toaster
  const [api, contextHolder] = notification.useNotification();
  //  *********** Map Stuff *********** //
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [presets, setPresets] = useState(presetRoutes ? presetRoutes : []);
  const [presetTotalDistance, setPresetTotalDistance] = useState(
    parseDetails?.distance ? parseDetails?.distance : 0
  );
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [presetMilestones, setPresetsMilestones] = useState(
    parseDetails?.postcards
  );
  const filteredPresetMilestones = presetMilestones?.filter(
    (milestone) => milestone !== undefined
  );
  const showMapModal = (e) => {
    e.preventDefault();
    setIsMapModalOpen(true);
  };
  const handleMapCancel = (e) => {
    e.preventDefault();
    setIsMapModalOpen(false);
  };
  useEffect(() => {
    router.push(typeof window !== undefined ? window.location.href : null);
    router.refresh();
  }, [challengeSingle]);
  //  *********** Map Stuff *********** //

  //  *********** Trophy Card Stuff *********** //
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [trophyContent, setTrophyContent] = useState(null);
  const [trophyValues, setTrophyValues] = useState(parseDetails?.trophies);

  const showCustomModal = (e) => {
    e.preventDefault();
    setIsCustomModalOpen(true);
  };
  const handleCustomCancel = () => {
    setIsCustomModalOpen(false);
  };
  //  *********** Trophy Card Stuff *********** //

  //  *********** Postcards Stuff *********** //
  const [frontImage, setFrontImage] = useState([]);
  const [backImage, setBackImage] = useState([]);
  const [postcardsData, setPostcardsData] = useState(parseDetails?.postcards);
  //  *********** Postcards Stuff *********** //

  // *************** Date Stuff *************** //
  const [startDate, setStartDate] = useState(null);
  const [endtDate, setEndDate] = useState(null);
  const [resetDate, setResetDate] = useState(false);
  const [initialStart, setInitialStart] = useState(
    moment(parseDetails?.start_date).format("YY-MM-DD")
  );
  const [initialEnd, setInitialEnd] = useState(
    moment(parseDetails?.end_date).format("YY-MM-DD")
  );
  const [useInitialDates, setUseInitialDates] = useState(true);

  const handleStartDate = (date) => {
    if (date) {
      setStartDate(date);
      setUseInitialDates(false);
    } else {
      setResetDate(true);
    }
  };

  const handleEndDate = (date) => {
    if (date && startDate) {
      setEndDate(date);
      setUseInitialDates(false);
    } else {
      setResetDate(true);
    }
  };
  let challengeDays;
  let challengeHours;
  let challengeMinutes;
  let challengeSeconds;

  if (useInitialDates && initialStart && initialEnd) {
    const initialDuration = moment.duration(
      moment(initialEnd, "YY-MM-DD").diff(moment(initialStart, "YY-MM-DD"))
    );

    challengeDays = initialDuration.days();
    challengeHours = initialDuration.hours();
    challengeMinutes = initialDuration.minutes();
    challengeSeconds = initialDuration.seconds();
  } else if (!useInitialDates && startDate && endtDate) {
    const duration = moment.duration(endtDate.diff(startDate));

    challengeDays = duration.days();
    challengeHours = duration.hours();
    challengeMinutes = duration.minutes();
    challengeSeconds = duration.seconds();
  }

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  let formattedStartDate = formatDate(startDate);
  let formattedEndDate = formatDate(endtDate);
  // *************** Date Stuff *************** //

  useEffect(() => {
    if (presetTotalDistance <= 4000) {
      setDifficultyLevel(1);
    } else if (presetTotalDistance <= 6000) {
      setDifficultyLevel(2);
    } else {
      setDifficultyLevel(3);
    }
  }, [presetTotalDistance]);
  // on Form Submission
  const onFinish = async (values) => {
    // for Postcards
    const postcardValues = values?.postcards?.map((item, i) => {
      return {
        id: values?.postcards[i]?.[`id${i}`],
        title: values?.postcards[i]?.[`title${i}`],
        description: values?.postcards[i]?.[`description${i}`],
        distance: values?.postcards[i]?.[`milestone${i}`],
        front_image: frontImage[i],
        back_image: backImage[i],
      };
    });
    // for Postcards
    // for trpohies
    const trophy = values?.trophies?.map((item, i) => {
      return {
        id: values?.trophies[i]?.[`id${i}`],
        title: values?.trophies[i]?.[`trophy_name${i}`],
        distance: values?.trophies[i]?.[`trophy_distance${i}`],
        time: values?.trophies[i]?.[`trophy_time${i}`],
        frequency: values?.trophies[i]?.[`frequency${i}`],
        trophyImage: trophyImage[i],
      };
    });
    // for trpohies

    const formData = new FormData();
    if (coverImage.length > 0) {
      formData.append("cover_image", coverImage[0]);
    }
    formData.append("description", values.description);
    formData.append("challenge_name", values.challenge_name);
    formData.append(
      "max_member_allowed_in_team",
      values.max_member_allowed_in_team
    );
    formData.append("difficulty", difficultyLevel);
    formData.append("distance", parseFloat(presetTotalDistance).toFixed(2));
    formData.append("price", values.price);
    presets.length > 0 && formData.append("route", JSON.stringify(presets));
    formData.append("rules_guidelines", values.rules_guidelines);
    if (startDate !== null) {
      formData.append("start_date", formatDate(startDate));
    } else {
      formData.append("start_date", initialStart);
    }
    if (endtDate !== null) {
      formData.append("end_date", formatDate(endtDate));
    } else {
      formData.append("end_date", initialEnd);
    }
    formData.append("_method", "PUT");

    // if (postcardValues !== undefined && postcardValues.length > 0) {
    //   postcardValues.map((item, i) => {
    //     formData.append(`postcards[${i}][id]`, item.id ? item.id : null);
    //     formData.append(`postcards[${i}][title]`, item.title);
    //     formData.append(
    //       `postcards[${i}][postcard-description]`,
    //       item.description
    //     );
    //     if (item.front_image !== undefined) {
    //       formData.append(`postcards[${i}][image_front]`, item.front_image);
    //     }
    //     if (item.back_image !== undefined) {
    //       formData.append(`postcards[${i}][image_back]`, item.back_image);
    //     }
    //     formData.append(
    //       `postcards[${i}][distance]`,
    //       parseFloat(item.distance).toFixed(2)
    //     );
    //   });
    // }
    if (trophy && trophy.length > 0) {
      trophy?.map((item, i) => {
        formData.append(`trophies[${i}][id]`, item?.id ? item?.id : null);
        formData.append(`trophies[${i}][title]`, item?.title);
        // formData.append(`trophies[${i}][distance]`, item?.distance);
        if (item?.trophyImage !== undefined) {
          formData.append(`trophies[${i}][image]`, item?.trophyImage);
        }
        formData.append(`trophies[${i}][frequency]`, item?.frequency);
        formData.append(`trophies[${i}][time]`, item?.time);
      });
    }
    if (filteredPresetMilestones.length > 0) {
      filteredPresetMilestones.map((item, i) => {
        formData.append(`postcards[${i}][id]`, item?.id ? item?.id : null);
        formData.append(`postcards[${i}][title]`, item?.title);
        formData.append(
          `postcards[${i}][postcard-description]`,
          item?.description
        );
        formData.append(
          `postcards[${i}][distance]`,
          item?.milestone?.toFixed(2)
        );
        formData.append(`postcards[${i}][lat_long]`, item?.lat_long);
        if (item?.image_url_front !== undefined) {
          if (typeof item?.image_url_front == "object") {
            formData.append(
              `postcards[${i}][image_front]`,
              item.image_url_front
            );
          }
        }
      });
    }

    //****************** */
    if (values.max_member_allowed_in_team < 3) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={"Minimum 3 Members are allowed"}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });
    } else {
      try {
        await editChallenge({ id: challengeSingle, data: formData });
      } catch (error) {
        console.error("Error posting data", error);
      }
    }
    //****************** */
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

      setTimeout(() => {
        router.push("/organization/view-manage-challenges");
      }, 2000);
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
            duration: 4,
          });
        });
      });
    }
  }, [error]);

  // ************* Initial Values Of Form from Local Storage ************* //
  const filteredrules = parseDetails?.rules_guidelines
    .map((item) => (item !== "\n" ? item : null))
    .filter(Boolean);
  const initialValues = {
    challenge_name: parseDetails?.title,
    difficulty:
      parseDetails?.difficulty_level == "Hard"
        ? 3
        : parseDetails?.difficulty_level == "Medium"
          ? 2
          : 1,
    max_member_allowed_in_team: JSON.stringify(
      parseDetails?.max_member_allowed_in_team
    ),
    price: JSON.stringify(parseDetails?.charges),
    description: parseDetails?.description,
    rules_guidelines: filteredrules?.map((rule) => `${rule} \n`),
    postcards: postcardsData?.map((_, i) => {
      return {
        [`id${i}`]: JSON.stringify(_?.id),
        [`title${i}`]: _?.title,
        [`description${i}`]: _?.description,
        [`milestone${i}`]: JSON.stringify(parseFloat(_?.milestone)),
        image_front: _?.image_url_front,
        image_back: _?.image_url_back,
      };
    }),
    trophies: trophyValues?.map((_, i) => {
      return {
        [`id${i}`]: JSON.stringify(_?.id),
        [`trophy_name${i}`]: _?.title,
        [`trophy_distance${i}`]: parseFloat(_?.distance).toFixed(2),
        [`frequency${i}`]: JSON.stringify(_?.frequency),
        [`trophy_time${i}`]: JSON.stringify(_?.time),
        [`trophy_image${i}`]: trophyImage[i],
      };
    }),
  };

  // ************* Initial Values Of Form from Local Storage ************* //
  return (
    <>
      {contextHolder}
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <DashboardTitle title={"Organization  Dashboard"} />
        <SubTitle title={"Edit Challenges"} />
        <Paragraph
          text={
            "The Border Rowing Indoor Rowing Studio is a great platform for those who want to take their rowing skills to the next level. the fact that the studio is known for its seasonal charity challenges, which is a great way to give back to the community"
          }
          margin={0}
          color={"text-primary"}
        />
        <div className="edit__challenge-form">
          <Form
            autoComplete="off"
            form={form}
            onFinish={onFinish}
            initialValues={initialValues}
          >
            <Row gutter={20} style={{ margin: "1.5rem 0" }}>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <label>
                  <Preheading
                    text={"Challenges Name"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                  <InputField
                    placeholder={"Enter Challenge Name"}
                    required
                    name={"challenge_name"}
                    message={"Challenge Name"}
                    maxLength={30}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.challenge_name}
                    </p>
                  )}
                </label>
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <label>
                  <Preheading
                    text={"Max Members Allowed"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                  <InputField
                    placeholder={"Max Team Members"}
                    required
                    type={"number"}
                    name={"max_member_allowed_in_team"}
                    message={"Max Team Members"}
                    maxLength={1}
                  />
                  {/* <SelectField
                    options={[
                      {
                        key: "1",
                        value: 1,
                        label: "Easy",
                      },
                      {
                        key: "2",
                        value: 2,
                        label: "Medium",
                      },
                      {
                        key: "3",
                        value: 3,
                        label: "Hard",
                      },
                    ]}
                    required
                    defaultValue={"Select Difficulty level"}
                    name={"difficulty"}
                    message={"Difficulty"}
                  /> */}
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.max_member_allowed_in_team}
                    </p>
                  )}
                </label>
              </Col>
              <Col
                lg={{ span: 24 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <label>
                  <Preheading
                    text={"Set Pricing"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                  <InputField
                    placeholder={"Enter Challenge price "}
                    required
                    name={"price"}
                    message={"Challenge Price"}
                    type={"number"}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.price}
                    </p>
                  )}
                </label>
              </Col>
              <Col
                lg={{ span: 24 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <label>
                  <Preheading
                    text={"Challenge Description"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                  <InputTextArea
                    placeholder={"Enter Challenge Description "}
                    required
                    name={"description"}
                    message={"Description"}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.rules_guidelines}
                    </p>
                  )}
                </label>
              </Col>
              <Col
                lg={{ span: 24 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <label>
                  <Preheading
                    text={"Set Rules & guidelines"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                  <InputTextArea
                    placeholder={"Enter rules & guidelines "}
                    required
                    name={"rules_guidelines"}
                    message={"Rules & Guidelines"}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.rules_guidelines}
                    </p>
                  )}
                </label>
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Preheading
                  text={"Time Duration"}
                  textTransform={"capitalize"}
                  color={"text-third"}
                  weight={700}
                />
                <div className="duration__wrapper">
                  <InputDuration
                    tag={"Days"}
                    label={"Set"}
                    disabled
                    fieldValue={resetDate ? null : challengeDays}
                  />
                  <InputDuration
                    tag={"Hrs"}
                    label={"Set"}
                    disabled
                    fieldValue={resetDate ? null : challengeHours}
                  />
                  <InputDuration
                    tag={"Mins"}
                    label={"Set"}
                    disabled
                    fieldValue={resetDate ? null : challengeMinutes}
                  />
                  <InputDuration
                    tag={"Secs"}
                    label={"Set"}
                    disabled
                    fieldValue={resetDate ? null : challengeSeconds}
                  />
                </div>
              </Col>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Preheading
                  text={"Start & End Date"}
                  textTransform={"capitalize"}
                  color={"text-third"}
                  weight={700}
                />
                <label>
                  <DateField
                    placeholder={parseDetails?.formated_start_date}
                    name={"start_date"}
                    message={"Start Date"}
                    onchange={handleStartDate}
                    // getDate={parseDetails?.start_date}
                    required={false}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.start_date}
                    </p>
                  )}
                </label>
                <label>
                  <DateField
                    placeholder={parseDetails?.formated_end_date}
                    name={"end_date"}
                    message={"End Date"}
                    onchange={handleEndDate}
                    // getDate={parseDetails?.end_date}
                    required={false}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.end_date}
                    </p>
                  )}
                </label>
              </Col>
            </Row>
            <Row style={{ margin: "1.5rem 0" }}>
              <Col
                lg={{ span: 24 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Preheading
                  text={"Set Route"}
                  textTransform={"capitalize"}
                  color={"text-third"}
                  weight={700}
                />
                <SelfImage src={"/mapp.png"} />
              </Col>
            </Row>
            <Row style={{ marginTop: "3em" }}>
              <Col
                lg={{ span: 8 }}
                md={{ span: 8 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <button
                  className="add__btn"
                  style={{ marginTop: ".8em" }}
                  onClick={showMapModal}
                >
                  {presetTotalDistance == 0
                    ? "Set Route on map"
                    : "Edit Route on map"}
                </button>
                <MapModal
                  isModalOpen={isMapModalOpen}
                  handleCancel={handleMapCancel}
                  presets={presets}
                  setPreSets={setPresets}
                  presetTotalDistance={presetTotalDistance}
                  setPresetTotalDistance={setPresetTotalDistance}
                  presetMilestones={presetMilestones}
                  setPresetsMilestones={setPresetsMilestones}
                  milestoneImage={milestoneImage}
                  setMilestoneImage={setMilestoneImage}
                />
              </Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 8 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                style={{ textAlign: "center" }}
              ></Col>
              <Col
                lg={{ span: 8 }}
                md={{ span: 8 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Paragraph
                  size
                  text={`Total distance : ${parseFloat(
                    presetTotalDistance
                  ).toFixed(2)} Meters`}
                  color={"text-black"}
                />
              </Col>
            </Row>
            <Row style={{ margin: "2em 0" }}>
              <Col
                lg={{ span: 24 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Preheading
                  text={"Select Challenge Image"}
                  textTransform={"capitalize"}
                  color={"text-third"}
                  weight={700}
                />
                <Form.Item
                  name={"cover_image"}
                  rules={[{ message: "Please Upload CoverImage" }]}
                >
                  <ImageUpload
                    coverImage={coverImage[0]}
                    setCoverImage={(file) => setCoverImage(file, 0)}
                    name={"cover_image"}
                    imageId={0}
                    preDisplay={parseDetails?.cover_image_url}
                  />
                </Form.Item>
                {error && error?.data && (
                  <p className="error-message">
                    {error?.data?.message?.cover_image}
                  </p>
                )}
              </Col>
            </Row>
            {trophyValues?.length > 0 && (
              <Row gutter={10} style={{ margin: "3em 0" }}>
                <Col
                  lg={{ span: 22 }}
                  md={{ span: 22 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Preheading
                    text={"Set Custom Trophie"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                </Col>
                <Col
                  lg={{ span: 2 }}
                  md={{ span: 2 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <button className="add__btn" onClick={showCustomModal}>
                    <Image
                      src={"/add.svg"}
                      width={18}
                      height={18}
                      alt="Border Rowers"
                    />
                    Edit
                  </button>
                  <Modal
                    open={isCustomModalOpen}
                    onCancel={handleCustomCancel}
                    width={900}
                    footer={null}
                    className="details__modal edit__trophy__modal"
                  >
                    <div
                      className="__close-modal"
                      style={{ textAlign: "right" }}
                    >
                      <CloseCircleOutlined
                        onClick={handleCustomCancel}
                        style={{
                          fontSize: "30px",
                          color: "var(--primary-color)",
                        }}
                        title="Close Window"
                      />
                    </div>
                    <Preheading
                      text={"Enter Details"}
                      color={"text-primary"}
                      margin={0}
                    />
                    <CustomHeading
                      text={"Set Custom Trophie"}
                      color={"text-primary"}
                    />
                    {trophyValues &&
                      trophyValues?.length > 0 &&
                      trophyValues?.map((item, i) => (
                        <Row gutter={20} key={i}>
                          <InputField
                            placeholder={"id"}
                            name={[`trophies`, i, `id${i}`]}
                            message={"ID"}
                            type={"hidden"}
                            maxLength={30}
                          />
                          <Col
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                          >
                            <InputField
                              placeholder={"Enter Trophy Name"}
                              message={"Trophy Name"}
                              // presetValue={item?.title}
                              name={[`trophies`, i, `trophy_name${i}`]}
                            />
                          </Col>
                          <Col
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                          >
                            <InputField
                              placeholder={"Enter Distance in Meters"}
                              name={[`trophies`, i, `trophy_distance${i}`]}
                              message={"Distance"}
                              type={"number"}
                              // presetValue={JSON.stringify(item?.distance)}
                            />
                          </Col>
                          <Col
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                          >
                            <InputField
                              placeholder={"Set Frequency"}
                              name={[`trophies`, i, `frequency${i}`]}
                              message={"frequency"}
                              type={"number"}
                              // presetValue={JSON.stringify(item?.frequency)}
                            />
                          </Col>
                          <Col
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                          >
                            <InputField
                              placeholder={"Set Days"}
                              name={[`trophies`, i, `trophy_time${i}`]}
                              message={"Days"}
                              type={"number"}
                            />
                          </Col>
                          <Col
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                            sm={{ span: 24 }}
                            xs={{ span: 24 }}
                          >
                            <ImageUpload
                              coverImage={coverImage[0]}
                              setTrophyImage={(file) => setTrophyImage(file, i)}
                              trophyImage={trophyImage}
                              name={[`trophies`, i, `trophy_image${i}`]}
                              imageId={i}
                              noRquired
                              preDisplay={item?.image_url}
                            />
                          </Col>
                        </Row>
                      ))}
                    <button
                      className="submit__btn"
                      onClick={handleCustomCancel}
                    >
                      Set Trophies
                    </button>
                  </Modal>
                </Col>
              </Row>
            )}
            {/* Commenting  PostCarsd as per Client Feedback  */}
            {/* {parseDetails?.postcards?.length > 0 && (
              <Row align={"middle"}>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Preheading
                    text={"Postcard"}
                    textTransform={"capitalize"}
                    color={"text-third"}
                    weight={700}
                  />
                </Col>
                <Col
                  lg={{ span: 12 }}
                  md={{ span: 12 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Paragraph
                    text={
                      "This information will be visible at the back of side of postcard "
                    }
                    color={"text-primary"}
                  />
                </Col>
              </Row>
            )} */}
            {/************ PostCard Data  ***********/}
            {/* {initialValues?.postcards?.length > 0
              ? initialValues?.postcards?.map((_, i) => {
                  return (
                    <Row
                      gutter={20}
                      style={{
                        margin: "0 0 2em",
                        borderBottom: "1px solid #ddd",
                      }}
                      key={i}
                    >
                      <Col
                        lg={{ span: 12 }}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <label>
                          <FlipBox
                            getChildValueFront={(file) =>
                              setFrontImage(file, i)
                            }
                            getChildValueBack={(file) => setBackImage(file, i)}
                            imgId={i}
                            // Only for Edit Challenge
                            preDisplayBack={_?.image_back}
                            preDisplayFront={_?.image_front}
                          />
                        </label>
                      </Col>
                      <Col
                        lg={{ span: 12 }}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                      >
                        <InputField
                          placeholder={"Postcard Name"}
                          name={[`postcards`, i, `id${i}`]}
                          message={"ID"}
                          type={"hidden"}
                        />
                        <InputField
                          placeholder={"Postcard Name"}
                          name={[`postcards`, i, `title${i}`]}
                          message={"Title"}
                        />
                        <InputField
                          placeholder={"Description"}
                          name={[`postcards`, i, `description${i}`]}
                          message={"Description"}
                        />
                        <InputField
                          placeholder={" distance"}
                          name={[`postcards`, i, `milestone${i}`]}
                          message={"distance"}
                          type={"number"}
                        />
                      </Col>
                    </Row>
                  );
                })
              : null} */}
            {/************ PostCard Data  ***********/}
            {/* Commenting  PostCarsd as per Client Feedback  */}

            {/* <Col
              lg={{ span: 24 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              style={{ margin: "1.5rem 0" }}
            >
              <Preheading
                text={"Invite Friends"}
                textTransform={"capitalize"}
                color={"text-third"}
                weight={700}
              />
            </Col>
            <div className="invite__friend-wrapp">
              <Row gutter={20}>
                {inviteFriendData && inviteFriendData.length > 0
                  ? inviteFriendData?.map((card) => (
                      <Col
                        lg={{ span: 12 }}
                        md={{ span: 12 }}
                        sm={{ span: 24 }}
                        xs={{ span: 24 }}
                        key={card?.id}
                      >
                        <InviteFriend
                          src={card?.img}
                          name={card?.name}
                          score={card?.score}
                        />
                      </Col>
                    ))
                  : "Not Found"}
              </Row>
            </div> */}
            <button type="submit" className="submit__btn">
              {isLoading ? <Spin /> : "Update Challenge"}
            </button>
          </Form>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditChallengeSingle;

// Google Map Modal
// **************
const MapModal = ({
  isModalOpen,
  handleCancel,
  presets,
  setPreSets,
  presetTotalDistance,
  setPresetTotalDistance,
  presetMilestones,
  setPresetsMilestones,
  milestoneImage,
  setMilestoneImage,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      width={"100%"}
      footer={null}
      className="spacings__zero"
      centered
    >
      <EditGMap
        cancle={handleCancel}
        presetTotalDistance={presetTotalDistance}
        setPresetTotalDistance={setPresetTotalDistance}
        presetMilestones={presetMilestones}
        setPresetsMilestones={setPresetsMilestones}
        presets={presets}
        setPreSets={setPreSets}
        milestoneImage={milestoneImage}
        setMilestoneImage={setMilestoneImage}
      />
    </Modal>
  );
};
// **************
// Google Map Modal
