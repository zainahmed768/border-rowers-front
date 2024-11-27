import { adminSidebar, userSidebar } from "../../../../constants";
import { List, Modal, Spin, notification } from "antd";
import Link from "next/link";
import Image from "next/image";
import AvatarUpload from "../../AvatarUpload/AvatarUpload";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../../features/reducers/AuthReducer";
import { useEffect, useState } from "react";
import { persistStore } from "redux-persist";
import store from "../../../../store/store";
import {
  useDeleteAccountMutation,
  useLogoutMutation,
} from "../../../../features/api/AuthApi";
import { deleteCookie } from "cookies-next";
import Preheading from "../../../Preheading";
import Paragraph from "antd/es/skeleton/Paragraph";
import Button from "../../../../components/Button";
const Sidebar = () => {
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  const path = usePathname();
  const router = useRouter();
  const isAdmin = path.startsWith("/organization");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Toolkit
  const [logout, { isSuccess, isLoading }] = useLogoutMutation();
  const [deleteAccount, { DeleteSuccess, DeleteLoading }] =
    useDeleteAccountMutation();
  const getUser = useSelector((state) => state?.AuthReducer?.user);
  const dispatch = useDispatch();

  // Handlers
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(userLogout());
      persistStore(store).purge();
      deleteCookie("role");
      deleteCookie("token");
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };
  let data = new FormData();
  data.append("id", getUser?.id);
  const handleDeleteAccount = async () => {
    router.push("delete-account");
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (DeleteSuccess) {
      router.push("/login");
    }
  }, [DeleteSuccess]);

  return (
    <>
      {contextHolder}
      <AvatarUpload />
      <List
        itemLayout="horizontal"
        dataSource={isAdmin ? adminSidebar : userSidebar}
        renderItem={(item, index) => {
          return (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Image
                    src={item.icon}
                    width={40}
                    height={40}
                    alt="Border Rowers"
                  />
                }
                title={<Link href={item.route}>{item.label}</Link>}
              />
              <div>
                <Image
                  src={"/arrow-right.svg"}
                  width={16}
                  height={14}
                  alt="Border Rowers"
                />
              </div>
            </List.Item>
          );
        }}
      />
      <div className="logout__handle" onClick={handleDeleteAccount}>
        <div className="___wrapp">
          <div className="logout__ico">
            <Image
              src={"/logout.svg"}
              height={40}
              width={40}
              alt="border rowers"
            />
          </div>
          <span className="logout__txt">
            {isLoading ? <Spin /> : "Delete Account"}
          </span>
        </div>
        <Image
          src={"/arrow-right.svg"}
          width={16}
          height={14}
          alt="Border Rowers"
        />
      </div>
      <div className="logout__handle" onClick={handleLogout}>
        <div className="___wrapp">
          <div className="logout__ico">
            <Image
              src={"/logout.svg"}
              height={40}
              width={40}
              alt="border rowers"
            />
          </div>
          <span className="logout__txt">{isLoading ? <Spin /> : "Logout"}</span>
        </div>
        <Image
          src={"/arrow-right.svg"}
          width={16}
          height={14}
          alt="Border Rowers"
        />
      </div>

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        footer={null}
        className="welcome-modal"
        onCancel={handleModalClose}
      >
        <div className="modal-wrap">
          <div className="text-center">
            <Preheading
              text={"Are you sure you want to delete this Account!"}
              textAlign={"center"}
            />
            <Paragraph
              text={
                "Dive in, explore, and start experiencing all that Border Rowers has to offer."
              }
              textAlign={"center"}
              margin={0}
              weight={400}
            />
            <div
              className="btn-wrap text-center "
              style={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
              // onClick={handleBeginClick}
            >
              <Button
                text={"Yes"}
                isLight={false}
                style={{
                  textAlign: "center",
                  // margin: "0px auto",
                }}
                onClick={handleDeleteAccount}
                // route={"/challenges"}
              />
              <Button
                text={"No"}
                isLight={false}
                style={{
                  textAlign: "center",
                  // margin: "0px auto",
                }}
                // route={"/challenges"}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
