"use client";
import AdminLayout from "../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import Paragraph from "../../../components/Paragraph";
import { Col, Form, Modal, Row, Spin, notification } from "antd";
import Preheading from "../../../components/Preheading";
import InputDuration from "../../../components/Dashboards/InputDuration/InputDuration";
import DateField from "../../../components/DateField/DateField";
import "../../../pages/Organization/ViewManage/EditChallengeSingle/index.css";
import SelfImage from "../../../components/SelfImage/SelfImage";
import InputField from "../../../components/InputField/InputField";
import Image from "next/image";
import "../../../pages/Organization/CreateChallenges/index.css";
import { useEffect, useState } from "react";
import SelectField from "../../../components/SelectField/SelectField";
import { Navbar } from "../../../components";
import GMap from "../../../components/GoogleMap/GMap";
import InputTextArea from "../../../components/InputTextArea/InputTextArea";
import {
  useCreateChallengeMutation,
  useCreateFreeChallengeMutation,
} from "../../../features/api/OrganizationApi";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import moment from "moment";
import CustomTrophy from "../../../components/Dashboards/CustomTrophy/CustomTrophy";
import FlipBox from "../../../components/Dashboards/FlipBox/FlipBox";
import { useRouter } from "next/navigation";
import { capitalizeWords } from "../../../utils/utils";
import { useSelector } from "react-redux";

const CreateChallenges = () => {
  const router = useRouter();
  // Toaster
  const [api, contextHolder] = notification.useNotification();

  const checkAdminOrganization = useSelector(
    (state) => state?.AuthReducer?.user?.is_organization_admin
  );
  // Toolkit Imports
  const [createChallenge, { data, isLoading, error, isSuccess }] =
    useCreateChallengeMutation();
  const [
    createFreeChallenge,
    {
      data: freeData,
      isLoading: freeLoading,
      error: freeError,
      isSuccess: freeSuccess,
    },
  ] = useCreateFreeChallengeMutation();
  // AntD Form Hook
  const [form] = Form.useForm();

  //  *********** Map Stuff *********** //
  const [path, setPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [milestoneImage, setMilestoneImage] = useState([]);
  const [milestoneImagePreview, setMilestoneImagePreview] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const filteredMilestones = milestones?.filter(
    (milestone) => milestone !== undefined
  );

  const showMapModal = (e) => {
    e.preventDefault();
    setIsMapModalOpen(true);
  };
  const handleMapCancel = () => {
    setIsMapModalOpen(false);
  };
  //  *********** Map Stuff *********** //

  // State for Challenge Cover Image Upload
  const [coverImage, setCoverImage] = useState([]);

  //  *********** Trophy Card Stuff *********** //
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customTrophyImage, setCustomTrophyImage] = useState([]);
  // Custom Trophy State
  const [custom, setCustom] = useState([
    {
      id: 0,
      content: (
        <Row gutter={20} key={0}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Enter Trophy value"}
              name={"trophy_name0"}
              message={"Trophy Name"}
              maxLength={30}
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
              name={"trophy_distance0"}
              message={"Distance"}
              type={"number"}
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
              name={"frequency0"}
              message={"frequency"}
              type={"number"}
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
              name={"trophy_time0"}
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
              coverImage={customTrophyImage[0]}
              setCoverImage={(file) => setCustomTrophyImage(file, 0)}
              name={"trophy_image0"}
              imageId={0}
              noRquired
            />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          ></Col>
        </Row>
      ),
    },
  ]);
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

  const [createPostCard, setCreatePostCard] = useState([
    {
      id: 0,
      content: (
        <Row gutter={20} style={{ margin: "2em 0" }} key={0}>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <FlipBox
              getChildValueFront={(file) => setFrontImage(file, 0)}
              getChildValueBack={(file) => setBackImage(file, 0)}
              imgId={0}
            />
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <InputField
              placeholder={"Postcard Name"}
              name={"title0"}
              message={"Milestone"}
            />
            <InputField
              placeholder={"Description"}
              name={"description0"}
              message={"Description"}
            />
            <InputField
              placeholder={"distance"}
              name={"distance0"}
              message={"Distance"}
              type={"number"}
              // validator={/^\d*(\.\d{0,2})?$/}
            />
          </Col>
        </Row>
      ),
    },
  ]);
  //  *********** Postcards Stuff *********** //

  // *************** Date Stuff *************** //
  const [startDate, setStartDate] = useState(null);
  const [endtDate, setEndDate] = useState(null);
  const [resetDate, setResetDate] = useState(false);

  const handleStartDate = (date) => {
    if (date) {
      setStartDate(date);
      setResetDate(false);
    } else {
      setResetDate(true);
    }
  };
  const handleEndDate = (date) => {
    if (date && startDate) {
      setEndDate(date);
      setResetDate(false);
    } else {
      setResetDate(true);
    }
  };
  let challengeDays;
  let challengeHours;
  let challengeMinutes;
  let challengeSeconds;

  if (startDate && endtDate) {
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

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endtDate);
  // *************** Date Stuff *************** //
  useEffect(() => {
    if (totalDistance <= 4000) {
      setDifficultyLevel(1);
    } else if (totalDistance <= 6000) {
      setDifficultyLevel(2);
    } else {
      setDifficultyLevel(3);
    }
  }, [totalDistance]);

  // on Form Submission
  const onFinish = async (values) => {
    // *********** For Postcards *********** //
    const postCardValues = createPostCard.map((postCard) => {
      const postCardId = postCard.id;
      return {
        title: form.getFieldValue(`title${postCardId}`),
        description: form.getFieldValue(`description${postCardId}`),
        distance: form.getFieldValue(`distance${postCardId}`),
        front_image:
          frontImage[postCardId] !== undefined ? frontImage[postCardId] : null,
        back_image:
          backImage[postCardId] !== undefined ? backImage[postCardId] : null,
      };
    });
    // *********** For Postcards *********** //

    // ******* for trophies ******* //
    const trophyCardValues = custom.map((trophy) => {
      const trophyId = trophy.id;
      return {
        title: form.getFieldValue(`trophy_name${trophyId}`),
        distance: form.getFieldValue(`trophy_distance${trophyId}`),
        image:
          customTrophyImage[trophyId] !== undefined
            ? customTrophyImage[trophyId]
            : null,
        frequency: form.getFieldValue(`frequency${trophyId}`),
        time: form.getFieldValue(`trophy_time${trophyId}`),
      };
    });
    // ******* for trophies ******* //

    // validation for difficulty level

    // validation for difficulty level

    const formData = new FormData();
    formData.append("cover_image", coverImage[0]);
    formData.append("description", values.description);
    formData.append("challenge_name", values.challenge_name);
    formData.append(
      "max_member_allowed_in_team",
      values.max_member_allowed_in_team
    );
    formData.append("difficulty", difficultyLevel);
    formData.append("distance", totalDistance.toFixed(2));
    formData.append("end_date", formattedEndDate);
    checkAdminOrganization !== 1 && formData.append("price", values.price);
    path.length > 0 && formData.append("route", JSON.stringify(path));
    formData.append("rules_guidelines", values.rules_guidelines);
    formData.append("start_date", formattedStartDate);

    // postCardValues.map((item, i) => {
    //   if (
    //     item.title !== undefined &&
    //     item.title !== "" &&
    //     item.description !== undefined &&
    //     item.description !== "" &&
    //     item.distance !== undefined &&
    //     item.distance !== ""
    //   ) {
    //     formData.append(`postcards[${i}][title]`, item.title);
    //     formData.append(
    //       `postcards[${i}][postcard-description]`,
    //       item.description
    //     );
    //     formData.append(`postcards[${i}][image_front]`, item.front_image);
    //     formData.append(`postcards[${i}][image_back]`, item.back_image);
    //     formData.append(
    //       `postcards[${i}][distance]`,
    //       parseFloat(item.distance).toFixed(2)
    //     );
    //   } else {
    //     console.log(`Skipping postcard ${i} due to undefined values.`);
    //   }
    // });

    // Changin from Milestones to Postcards as per client feedback
    if (filteredMilestones.length > 0) {
      filteredMilestones.map((item, i) => {
        formData.append(`postcards[${i}][id]`, null);
        formData.append(`postcards[${i}][title]`, item.name);
        formData.append(
          `postcards[${i}][postcard-description]`,
          item.description
        );
        if (item.milestonImage !== undefined) {
          formData.append(`postcards[${i}][image_front]`, item.milestonImage);
        }
        formData.append(
          `postcards[${i}][distance]`,
          parseInt(item.distance).toFixed(2)
        );
        formData.append(
          `postcards[${i}][lat_long]`,
          JSON.stringify(item.latLong)
        );
      });
    }
    // Changin from Milestones to Postcards as per client feedback
    trophyCardValues?.map((item, i) => {
      if (
        item.title !== undefined &&
        item.distance !== undefined &&
        item.frequency !== undefined &&
        item.time !== undefined
      ) {
        formData.append(`trophies[${i}][id]`, i);
        formData.append(`trophies[${i}][title]`, item.title);
        formData.append(`trophies[${i}][distance]`, item.distance);
        formData.append(
          `trophies[${i}][image]`,
          item.image == undefined ? null : item.image
        );
        formData.append(`trophies[${i}][frequency]`, item.frequency);
        formData.append(`trophies[${i}][time]`, item.time);
      }
    });

    //****************** */
    // checking the price field
    if (values.price <= 0) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={"Please Set Challenge Price"}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });
    } else if (values.max_member_allowed_in_team < 3) {
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
        if (checkAdminOrganization === 1) {
          await createFreeChallenge(formData);
        } else {
          await createChallenge(formData);
        }
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
        description: (
          <Paragraph
            text={capitalizeWords(data?.message)}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });

      setTimeout(() => {
        router.push("/organization/view-manage-challenges");
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (freeSuccess) {
      // Show Notification
      api.info({
        message: `Notification`,
        description: (
          <Paragraph
            text={capitalizeWords(freeData?.message)}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });

      setTimeout(() => {
        router.push("/organization/view-manage-challenges");
      }, 2000);
    }
  }, [freeSuccess]);

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
    } else if (freeError && freeError.data && freeError.data.message) {
      Object.entries(freeError.data.message).forEach(
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
              duration: 4,
            });
          });
        }
      );
    }
  }, [error, freeError]);

  return (
    <>
      {contextHolder}
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <DashboardTitle title={"Organization  Dashboard"} />
        <div className="edit__challenge-form  __contains-map">
          <Form autoComplete="off" onFinish={onFinish} form={form}>
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

                  {/* Commented on client requeset  */}
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
                    message={"Difficulty Level"}
                  /> */}
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.max_member_allowed_in_team}
                    </p>
                  )}
                </label>
              </Col>
              {checkAdminOrganization !== 1 && (
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

                      // validator={/^\d*(\.\d{0,2})?$/}
                    />
                    {error && error?.data && (
                      <p className="error-message">
                        {error?.data?.message?.price}
                      </p>
                    )}
                  </label>
                </Col>
              )}

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
                  text={"Set Start & End Date"}
                  textTransform={"capitalize"}
                  color={"text-third"}
                  weight={700}
                />
                <label>
                  <DateField
                    placeholder={"Set Starting Date"}
                    name={"start_date"}
                    message={"Start Date"}
                    onchange={handleStartDate}
                  />
                  {error && error?.data && (
                    <p className="error-message">
                      {error?.data?.message?.start_date}
                    </p>
                  )}
                </label>
                <label>
                  <DateField
                    placeholder={"Set End Date"}
                    name={"end_date"}
                    message={"End Date"}
                    onchange={handleEndDate}
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
                  {totalDistance == 0
                    ? "Set Route on map"
                    : "Edit Route on map"}
                </button>
                <MapModal
                  isModalOpen={isMapModalOpen}
                  handleCancel={handleMapCancel}
                  path={path}
                  setPath={setPath}
                  totalDistance={totalDistance}
                  setTotalDistance={setTotalDistance}
                  milestones={milestones}
                  setMilestones={setMilestones}
                  milestoneImage={milestoneImage}
                  setMilestoneImage={setMilestoneImage}
                  milestoneImagePreview={milestoneImagePreview}
                  setMilestoneImagePreview={setMilestoneImagePreview}
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
                  text={`Total distance : ${totalDistance.toFixed(2)} Meters`}
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
                  />
                </Form.Item>
                {error && error?.data && (
                  <p className="error-message">
                    {error?.data?.message?.cover_image}
                  </p>
                )}
              </Col>
            </Row>

            {/* ***************************************  */}
            {/* Commenting on behalf of client feedback  */}
            {/* ***************************************  */}
            {/* <Row gutter={10} style={{ margin: "3em 0" }}>
              <Col
                lg={{ span: 22 }}
                md={{ span: 22 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Preheading
                  text={"Set Custom Trophies (Optional)"}
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
                  Add
                </button>
                custom trophy modal component 
                <CustomTrophy
                  isModalOpen={isCustomModalOpen}
                  handleCancel={handleCustomCancel}
                  // trophyContent={trophyContent}
                  // setTrophyContent={setTrophyContent}
                  // getTrophyContent={getTrophyContent}
                  // passing the state from parent
                  custom={custom}
                  setCustom={setCustom}
                  customTrophyImage={customTrophyImage}
                  setCustomTrophyImage={setCustomTrophyImage}
                  perviousTrophies={[]}
                />
                 custom trophy modal component  
              </Col>
            </Row> */}
            {/* ***************************************  */}
            {/* Commenting on behalf of client feedback  */}
            {/* ***************************************  */}

            {/* Create Post Cards  */}
            {/* <Row align={"middle"}>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Preheading
                  text={"Postcard (Optional)"}
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
            </Row> */}
            {/* Create Post Cards  */}
            {/* <CreatPostCards
              createPostCard={createPostCard}
              setCreatePostCard={setCreatePostCard}
              setFrontImage={setFrontImage}
              setBackImage={setBackImage}
            /> */}
            {/* Create Post Cards  */}
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
            <button
              type="submit"
              className="submit__btn"
              // disabled={postcardSum > totalDistance ? true : false}
            >
              {isLoading ? <Spin /> : "Create Challenge"}
              {freeLoading ? <Spin /> : "Create Free Challenge"}
            </button>
          </Form>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreateChallenges;

// Google Map Modal
// **************
const MapModal = ({
  isModalOpen,
  handleCancel,
  path,
  setPath,
  totalDistance,
  setTotalDistance,
  milestones,
  setMilestones,
  milestoneImage,
  setMilestoneImage,
  milestoneImagePreview,
  setMilestoneImagePreview,
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
      <GMap
        cancle={handleCancel}
        path={path}
        setPath={setPath}
        totalDistance={totalDistance}
        setTotalDistance={setTotalDistance}
        milestones={milestones}
        setMilestones={setMilestones}
        milestoneImage={milestoneImage}
        setMilestoneImage={setMilestoneImage}
        milestoneImagePreview={milestoneImagePreview}
        setMilestoneImagePreview={setMilestoneImagePreview}
      />
    </Modal>
  );
};
// **************
// Google Map Modal
