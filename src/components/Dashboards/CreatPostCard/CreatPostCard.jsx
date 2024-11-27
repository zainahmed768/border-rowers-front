import { Col, Row } from "antd";
import React from "react";
import FlipBox from "../FlipBox/FlipBox";
import InputField from "../../InputField/InputField";
import Image from "next/image";

const CreatPostCard = ({
  createPostCard,
  setCreatePostCard,
  setFrontImage,
  setBackImage,
  presetPostCards,
}) => {
  let duplicatePostCard = (e) => {
    e.preventDefault();
    const newId = createPostCard.length;
    const newPostCard = {
      id: newId,
      content: (
        <>
          <button
            className="add__btn remove__btn"
            onClick={() => removePostCard(newId)}
            style={{ marginBottom: "10px" }}
          >
            &times;
          </button>
          <Row
            gutter={20}
            style={{ margin: "0 0 2em", borderBottom: "1px solid #ddd" }}
            key={newId}
          >
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <label>
                <FlipBox
                  getChildValueFront={(file) => setFrontImage(file, newId)}
                  getChildValueBack={(file) => setBackImage(file, newId)}
                  imgId={newId}
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
                name={`title${createPostCard.length}`}
                message={"Title"}
              />
              <InputField
                placeholder={"Description"}
                name={`description${createPostCard.length}`}
                message={"Description"}
              />
              {/* <InputField
                placeholder={"Will be rewarded on distance"}
                name={`reward${createPostCard.length}`}
                message={"Reward"}
              /> */}
              <InputField
                placeholder={" distance"}
                name={`distance${createPostCard.length}`}
                message={"distance"}
                type={"number"}
                // validator={/^\d*(\.\d{0,2})?$/}
              />
            </Col>
          </Row>
        </>
      ),
    };
    setCreatePostCard([...createPostCard, newPostCard]);
  };
  const removePostCard = (idToRemove) => {
    setCreatePostCard((prevCreatePostCard) =>
      prevCreatePostCard.filter((postCard) => postCard.id !== idToRemove)
    );
  };

  return (
    <>
      {/* check the length of presets  */}
      {/* {!presetPostCards?.length > 0 && (
        <>
          {createPostCard.map((postCard) => (
            <div key={postCard.id}>{postCard.content}</div>
          ))}
          <button className="add__btn" onClick={duplicatePostCard}>
            <Image
              src={"/add.svg"}
              width={18}
              height={18}
              alt="Border Rowers"
            />
            Add New Postcard
          </button>
        </>
      )} */}
      {!presetPostCards && (
        <>
          {createPostCard.map((postCard) => (
            <div key={postCard.id}>{postCard.content}</div>
          ))}
          <button className="add__btn" onClick={duplicatePostCard}>
            <Image
              src={"/add.svg"}
              width={18}
              height={18}
              alt="Border Rowers"
            />
            Add New Postcard
          </button>
        </>
      )}
      {/* {createPostCard.map((postCard) => (
        <div key={postCard.id}>{postCard.content}</div>
      ))}
      <button className="add__btn" onClick={duplicatePostCard}>
        <Image src={"/add.svg"} width={18} height={18} alt="Border Rowers" />
        Add New Postcard
      </button> */}
    </>
  );
};

export default CreatPostCard;
