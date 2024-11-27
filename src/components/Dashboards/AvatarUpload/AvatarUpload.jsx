import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Modal, Spin, Upload, notification } from "antd";
import Image from "next/image";

import Paragraph from "../../Paragraph";
import {
  useGetUserQuery,
  useUpdateImageMutation,
} from "../../../features/api/AuthApi";

const AvatarUpload = () => {
  // Get User Image From API Response
  const { data, refetch } = useGetUserQuery();
  const profileImage = data?.response?.data?.profile_img;
  // Update Image API
  const [updateImage, { error, isSuccess, data: updateAvatar, isLoading }] =
    useUpdateImageMutation();
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Toaster
  const [api, contextHolder] = notification.useNotification();

  const [fileInput, setFileInput] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      // Show Notification
      api.info({
        message: `Notification`,
        description: (
          <Paragraph text={updateAvatar?.message} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2.3,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph
            text={error?.data?.message?.profile_img}
            color={"text-primary"}
          />
        ),
        placement: "top",
        duration: 2.3,
      });
    }
  }, [error]);

  const handleFileInputChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileInput(file);
    };
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profile_img", file);

        const response = await updateImage(formData);
      } catch (error) {
        console.error("Error updating image:", error);
      }
    }
  };

  const uploadButton = (
    <Image src={"/add.svg"} alt="border rowers" width={50} height={50} />
  );

  return (
    <>
      {contextHolder}
      <div className="avatar__uplad-wrapp sidebar__profile">
        {isLoading ? (
          <Spin />
        ) : (
          <Image
            src={profileImage ? profileImage : "/user-avatar.png"}
            alt="Border Rower"
            width={129}
            height={129}
          />
        )}
        <button className="edit__upload-avatar">
          <label>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
              name="profile_img"
            />
            <Image
              src={"/edit.svg"}
              width={40}
              height={40}
              alt="Border Rowers"
            />
          </label>
        </button>
      </div>
    </>
  );
};
export default AvatarUpload;
