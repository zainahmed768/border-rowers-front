import { useEffect, useState } from "react";
import "./index.css";
import { Form } from "antd";
import Image from "next/image";
import { CloseCircleOutlined } from "@ant-design/icons";

const FlipBox = ({
  getChildValueBack,
  getChildValueFront,
  imgId,
  required,
  preDisplayFront,
  preDisplayBack,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [previewOpenFront, setPreviewOpenFront] = useState(false);
  const [fileListFront, setFileListFront] = useState([]);
  const [propImgFront, setPropImgFront] = useState(
    preDisplayFront ? preDisplayFront : null
  );

  const [previewOpenBack, setPreviewOpenBack] = useState(false);
  const [fileListBack, setFileListBack] = useState([]);
  const [propImgBack, setPropImgBack] = useState(
    preDisplayBack ? preDisplayBack : null
  );

  const [dataFileFront, setDataFileFront] = useState(null);
  const [dataFileBack, setDataFileBack] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (propImgFront !== null || propImgBack !== null) {
      setPreviewOpenFront(true);
      setPreviewOpenBack(true);
    }
  }, [propImgFront, propImgBack]);

  const handlePreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileListFront(reader.result);
      setPreviewOpenFront(true);
    };
  };
  const handlePreviewBack = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileListBack(reader.result);
      setPreviewOpenBack(true);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    // setCoverImage(file);
    handlePreview(file);
    setDataFileFront(file);

    // Testing //
    getChildValueFront((prev) => {
      const updatedFrontImage = [...prev];
      updatedFrontImage[imgId] = file;
      return updatedFrontImage;
    });
    // Testing //
  };
  const handleChangeBack = (e) => {
    const file = e.target.files[0];
    handlePreviewBack(file);
    setDataFileBack(file);

    // Testing //
    getChildValueBack((prev) => {
      const updatedBackImage = [...prev];
      updatedBackImage[imgId] = file;
      return updatedBackImage;
    });
    // Testing //
  };

  const handleCancle = () => {
    setFileListFront("");
    setPreviewOpenFront(false);
    if (propImgFront) {
      setPropImgFront(null);
    }
  };

  const handleCancleBack = () => {
    setFileListBack("");
    setPreviewOpenBack(false);
    if (propImgBack) {
      setPropImgBack(null);
    }
  };

  return (
    <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {propImgFront == null && fileListFront.length <= 0 ? (
            <Form.Item name={"image_front"}>
              <label>
                <input
                  type="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <div
                  className="uploadButton"
                  style={{ transform: "translateX(0)" }}
                >
                  <Image
                    src={"/upload.png"}
                    height={92}
                    width={92}
                    alt="Border Rower"
                  />
                </div>
              </label>
            </Form.Item>
          ) : null}

          {previewOpenFront && (
            <div className="__preview_img_wrapp">
              <CloseCircleOutlined onClick={handleCancle} />
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={propImgFront ? propImgFront : fileListFront}
                className="preview__img"
              />
            </div>
          )}
        </div>
        <div className="flip-card-back">
          {propImgBack == null && fileListBack.length <= 0 ? (
            <Form.Item name={"image_back"}>
              <label>
                <input
                  type="file"
                  onChange={handleChangeBack}
                  style={{ display: "none" }}
                />
                <div
                  className="uploadButton"
                  style={{ transform: "translateX(0)" }}
                >
                  <Image
                    src={"/upload.png"}
                    height={92}
                    width={92}
                    alt="Border Rower"
                  />
                </div>
              </label>
            </Form.Item>
          ) : null}

          {previewOpenBack && (
            <div className="__preview_img_wrapp">
              <CloseCircleOutlined onClick={handleCancleBack} />
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={propImgBack ? propImgBack : fileListBack}
                className="preview__img"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flip__actions">
        <button onClick={handleClick}>
          <Image
            src={"/reverse.svg"}
            width={18}
            height={13}
            alt="Border Rowers"
          />
          Flip to Back
        </button>
      </div>
    </div>
  );
};

export default FlipBox;
