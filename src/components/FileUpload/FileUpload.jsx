"use client";

// import { Modal, Upload } from "antd";
// import { useState } from "react";
// import Image from "next/image";
// import "./index.css";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const FileUpload = ({ limit, fileList, setFileList }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");
//   // const [fileList, setFileList] = useState([]);
//   const handleCancel = () => setPreviewOpen(false);

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//     setPreviewTitle(
//       file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
//     );
//   };

//   const handleChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);

//     const uploadableFile = fileList[0]
//     const getChallengeStorage =
//       typeof window !== undefined && localStorage.getItem("challengeDetails");
//     const parseChellenge = JSON.parse(getChallengeStorage);
//     const meterImage = { ...parseChellenge, uploadableFile };
//     localStorage.setItem("challengeDetails", JSON.stringify(meterImage));

//   };

//   const uploadButton = (
//     <div className="uploadButton">
//       <Image src={"/upload.png"} height={92} width={92} alt="Border Rower" />
//       <h5 className="text-secondary">Browse</h5>
//     </div>
//   );

//   return (
//     <div className="file__upload">
//       <Upload
//         action="#"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= limit ? null : uploadButton}
//       </Upload>
//       <Modal
//         open={previewOpen}
//         title={previewTitle}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <img
//           alt="example"
//           style={{
//             width: "100%",
//           }}
//           src={previewImage}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default FileUpload;

import Image from "next/image";
import { useState } from "react";
import "./index.css";
import { CloseCircleOutlined } from "@ant-design/icons";

const FileUpload = ({ limit, fileList, setFileList, setFile }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  // const [fileList, setFileList] = useState("");

  const handlePreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList(reader.result);
      setPreviewOpen(true);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handlePreview(file);
    setFile(file)

    const getChallengeStorage =
    typeof window !== undefined ? window.localStorage.getItem("challengeDetails") : null;
    const parseChellenge = JSON.parse(getChallengeStorage);
    const meterImage = { ...parseChellenge, file };
    localStorage.setItem("challengeDetails", JSON.stringify(meterImage));
  };

  const handleCancle = () => {
    setFileList("");
    setPreviewOpen(false);
  };

  return (
    <div className="file__upload join__offline">
      {fileList.length <= 0 && (
        <label>
          <input
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <div className="uploadButton">
            <Image
              src={"/upload.png"}
              height={92}
              width={92}
              alt="Border Rower"
            />
            <h5 className="text-secondary">Browse</h5>
          </div>
        </label>
      )}

      {previewOpen && (
        <div className="__preview_img_wrapp">
          <CloseCircleOutlined onClick={handleCancle} />
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={fileList}
            className="preview__img"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
