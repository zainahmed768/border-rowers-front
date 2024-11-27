import { adminSidebar, userSidebar } from "../../../../constants";
import { List, Spin, notification } from "antd";
import Link from "next/link";
import Image from "next/image";
import AvatarUpload from "../../AvatarUpload/AvatarUpload";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../../features/reducers/AuthReducer";
import { useEffect } from "react";
import { persistStore } from "redux-persist";
import store from "../../../../store/store";
import { useLogoutMutation } from "../../../../features/api/AuthApi";
import { deleteCookie } from "cookies-next";

const Sidebar = () => {
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  const path = usePathname();
  const router = useRouter();
  const isAdmin = path.startsWith("/organization");

  // Toolkit
  const [logout, { isSuccess, isLoading }] = useLogoutMutation();
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

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

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
    </>
  );
};

export default Sidebar;
