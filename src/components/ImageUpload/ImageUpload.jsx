import Image from "next/image";
import { useEffect, useState } from "react";
import "../FileUpload/index.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Form } from "antd";

const ImageUpload = ({
  setCoverImage,
  name,
  coverImage,
  imageId,
  preDisplay,
  noRquired,
  setTrophyImage,
  trophyImage,
  setMilestoneImagePreview,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [propImg, setPropImg] = useState(preDisplay ? preDisplay : null);

  useEffect(() => {
    if (propImg !== null) {
      setPreviewOpen(true);
    }
  }, [propImg]);

  const handlePreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList(reader.result);
      setPreviewOpen(true);
      if (setMilestoneImagePreview) {
        setMilestoneImagePreview(reader.result);
      }
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (setCoverImage) {
      setCoverImage((prev) => {
        const updatedCoverImages = [...prev];
        updatedCoverImages[imageId] = file;
        return updatedCoverImages;
      });
    }
    if (trophyImage) {
      setTrophyImage((prev) => {
        const updatedCoverImages = [...prev];
        updatedCoverImages[imageId] = file;
        return updatedCoverImages;
      });
    }
    handlePreview(file);
  };

  const handleCancle = () => {
    setFileList("");
    setPreviewOpen(false);
    if (propImg) {
      setPropImg(null);
    }
  };

  return (
    <div className="form__file-upload">
      {/* {fileList.length <= 0 && (
        <Form.Item name={name} rules={[{ required: true }]}>
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
              <h5 className="text-secondary">Browse</h5>
            </div>
          </label>
        </Form.Item>
      )} */}
      {propImg == null && fileList.length <= 0 ? (
        <Form.Item
          name={name}
          rules={[
            {
              required: noRquired ? false : true,
              message: "Please Upload Image!",
            },
          ]}
        >
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
              <h5 className="text-secondary">Browse</h5>
            </div>
          </label>
        </Form.Item>
      ) : null}

      {previewOpen && (
        <div className="__preview_img_wrapp">
          <CloseCircleOutlined onClick={handleCancle} />
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={propImg ? propImg : fileList}
            className="preview__img"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
