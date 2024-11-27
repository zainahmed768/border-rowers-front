import { Col, Form, Modal, Row, TimePicker } from "antd";
import { useCallback, useEffect, useState } from "react";
import InputField from "../../InputField/InputField";
// import FileUploadSmall from "../../FileUploadSmall/FileUploadSmall";
import SelectField from "../../SelectField/SelectField";
import Preheading from "../../Preheading";
import CustomHeading from "../../CustomHeading";
import Image from "next/image";
import ImageUpload from "../../ImageUpload/ImageUpload";
import { GetCountryOptions } from "../../../utils/regionsData";
import { CloseCircleOutlined } from "@ant-design/icons";

const CustomTrophy = ({
  isModalOpen,
  handleCancel,
  getTrophyContent,
  //only when edit challenge
  perviousTrophies,
  custom,
  setCustom,
  customTrophyImage,
  setCustomTrophyImage,
  //
  // getting the state
}) => {
  const [coverImage, setCoverImage] = useState([]);
  const [form] = Form.useForm();

  const onChange = (time, timeString) => {
    // console.log(time, timeString);
  };

  // // Custom Trophy State
  // const [custom, setCustom] = useState([
  //   {
  //     id: 0,
  //     content: (
  //       <Row gutter={20} key={0}>
  //         <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           <InputField
  //             placeholder={"Enter Trophy Name"}
  //             name={"trophy_name0"}
  //             message={"Trophy Name"}
  //           />
  //         </Col>
  //         <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           <InputField
  //             placeholder={"Enter Distance in Meters"}
  //             name={"trophy_distance0"}
  //             message={"Distance"}
  //             type={"number"}
  //           />
  //         </Col>
  //         <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           <InputField
  //             placeholder={"Set Frequency"}
  //             name={"frequency0"}
  //             message={"frequency"}
  //             type={"number"}
  //           />
  //         </Col>
  //         <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           <InputField
  //             placeholder={"Set Days"}
  //             name={"trophy_time0"}
  //             message={"Days"}
  //             type={"number"}
  //           />
  //         </Col>
  //         <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           <ImageUpload
  //             coverImage={coverImage[0]}
  //             setCoverImage={(file) => setCoverImage(file, 0)}
  //             name={"trophy_image0"}
  //             imageId={0}
  //             noRquired
  //           />
  //         </Col>
  //         {/* <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           <Form.Item name={"trophy_time0"}>
  //             <TimePicker use12Hours format="h:mm:ss A" />
  //           </Form.Item>
  //         </Col> */}
  //         <Col
  //           lg={{ span: 12 }}
  //           md={{ span: 12 }}
  //           sm={{ span: 24 }}
  //           xs={{ span: 24 }}
  //         >
  //           {/* <button className="submit__btn" onClick={handleCancel}>
  //             Set Trophies{" "}
  //           </button> */}
  //         </Col>
  //       </Row>
  //     ),
  //   },
  // ]);

  // Duplicate state
  let handleDuplicate = () => {
    setCustom((prev) => {
      const newId = prev.length;
      const newTrophyFields = {
        id: newId,
        content: (
          <>
            <button
              className="remove__btn"
              style={{
                marginLeft: "unset",
                marginBottom: "10px",
              }}
              onClick={() => removeCustomTrophy(newId)}
            >
              &times;
            </button>
            <Row gutter={20} key={0}>
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <InputField
                  placeholder={"Enter Trophy Name"}
                  name={`trophy_name${newId}`}
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
                  name={`trophy_distance${newId}`}
                  message={"Distance in Miles"}
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
                  name={`frequency${newId}`}
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
                  name={`trophy_time${newId}`}
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
                  coverImage={coverImage[newId]}
                  setCoverImage={(file) => setCustomTrophyImage(file, newId)}
                  name={`trophy_image${newId}`}
                  imageId={newId}
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
          </>
        ),
      };
      return [...prev, newTrophyFields];
    });
    // setTrophyContent([...custom, newTrophyFields]);
  };

  // Remove Trophy
  const removeCustomTrophy = (idToRemove) => {
    setCustom((prevCreatePostCard) =>
      prevCreatePostCard.filter(
        (trophyFileds) => trophyFileds.id !== idToRemove
      )
    );
  };

  // // Get trophy data
  // const trophyCardValues = custom.map((trophy) => {
  //   const trophyId = trophy.id;
  //   return {
  //     title: form.getFieldValue(`trophy_name${trophyId}`),
  //     distance: form.getFieldValue(`trophy_distance${trophyId}`),
  //     image: coverImage[trophyId] !== undefined ? coverImage[trophyId] : null,
  //     frequency: form.getFieldValue(`frequency${trophyId}`),
  //     time: form.getFieldValue(`trophy_time${trophyId}`),
  //   };
  // });

  // console.log("trophyCardValues", trophyCardValues)

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      width={900}
      footer={null}
      className="details__modal"
    >
      <div className="__close-modal" style={{ textAlign: "right" }}>
        <CloseCircleOutlined
          onClick={handleCancel}
          style={{ fontSize: "30px", color: "var(--primary-color)" }}
          title="Close Window"
        />
      </div>
      <Preheading text={"Enter Details"} color={"text-primary"} margin={0} />
      <CustomHeading text={"Set Custom Trophie"} color={"text-primary"} />
      {/* <Form form={form}> */}
      {/* Previous Trophies  */}
      {/* Preview preset Trophies  */}
      {perviousTrophies &&
        perviousTrophies?.length > 0 &&
        perviousTrophies?.map((item, i) => (
          <Row gutter={20} key={i}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <InputField
                placeholder={"Enter Trophy Name"}
                name={`trophy_name${i}`}
                message={"Trophy Name"}
                presetValue={item?.title}
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
                name={`trophy_image${i}`}
                imageId={0}
                noRquired
                preDisplay={item?.image_url}
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
                name={`trophy_distance${i}`}
                message={"Distance"}
                type={"number"}
                presetValue={JSON.stringify(item?.distance)}
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
                name={`frequency${i}`}
                message={"frequency"}
                type={"number"}
                presetValue={JSON.stringify(item?.frequency)}
              />
            </Col>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            ></Col>
            {/* <button
                className="submit__btn"
                onClick={() => getTrophyContent(trophyCardValues)}
              >
                Set Trophies
              </button> */}
          </Row>
        ))}
      {/* Preview preset Trophies  */}
      {/* ************ */}
      {/* Add New  */}
      {/* ************ */}
      {/* Previous Trophies  */}
      {!perviousTrophies.length > 0 && (
        <>
          {custom.map((customTrophy) => (
            <div key={customTrophy.id}>{customTrophy.content}</div>
          ))}
        </>
      )}
      <button className="submit__btn" onClick={handleCancel}>
        Set Trophies
      </button>
      {/* </Form> */}
      {!perviousTrophies.length > 0 && (
        <button
          className="add__btn"
          onClick={handleDuplicate}
          style={{ marginTop: "10px" }}
        >
          <Image src={"/add.svg"} width={18} height={18} alt="Border Rowers" />
          Add More Trophies
        </button>
      )}
    </Modal>
  );
};

export default CustomTrophy;
