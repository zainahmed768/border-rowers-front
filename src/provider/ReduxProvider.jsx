"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../store/store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { getCookie } from "cookies-next";
import { notification } from "antd";
import Paragraph from "../components/Paragraph";

export const persistor = persistStore(store);
const ReduxProvider = ({ children }) => {
  // Toaster
  const [api, contextHolder] = notification.useNotification();
  // Route Protection
  const router = useRouter();
  const path = usePathname();
  const isUser = path.startsWith("/user");
  const isAuth = path.startsWith("/organization");
  const isAuthenticated = getCookie("token");
  const role = getCookie("role");

  useLayoutEffect(() => {
    if (!isAuthenticated && (isUser || isAuth)) {
      api.error({
        message: `Notification`,
        description: (
          <Paragraph text={"Please Login to Continue"} color={"text-primary"} />
        ),
        placement: "top",
        duration: 2,
      });

      router.push("/login");
    } else if (isAuthenticated) {
      if (role === "user" && isAuth) {
        api.error({
          message: `Notification`,
          description: (
            <Paragraph text={"Unauthenticated!"} color={"text-primary"} />
          ),
          placement: "top",
          duration: 2,
        });

        router.back();
      } else if (role === "organization" && isUser) {
        api.error({
          message: `Notification`,
          description: (
            <Paragraph text={"Unauthenticated!"} color={"text-primary"} />
          ),
          placement: "top",
          duration: 2,
        });

        router.back();
      }
    }
  }, [path]);

  return (
    <>
      {contextHolder}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default ReduxProvider;
