"use client";

import Image from "next/image";
import "./Navbar.css";
import Link from "next/link";
import { navLinks } from "../../../constants";
import Button from "../../Button";
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import MobileNav from "../MobileNav/MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie, getCookie } from "cookies-next";
import { useLogoutMutation } from "../../../features/api/AuthApi";
import { userLogout } from "../../../features/reducers/AuthReducer";
import { persistStore } from "redux-persist";
import store from "../../../store/store";
import { Spin } from "antd";

const Navbar = ({ logo, isLight }) => {
  const pathname = usePathname();
  const router = useRouter();

  // States
  const [indicatorPosition, setIndicatorPosition] = useState({
    left: 0,
    width: 0,
  });
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  // Get Cookies Data
  const getUserRole = getCookie("role");
  const getLoggedInState = getCookie("token");

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

  // Functions for Nav Indicator
  const handleMenuItemHover = (e) => {
    const menuItem = e.target;
    const { offsetLeft, offsetWidth } = menuItem;
    setIndicatorPosition({ left: offsetLeft, width: offsetWidth });
  };

  const handleMenuItemClick = (e) => {
    const menuItem = e.target;
    const { offsetLeft, offsetWidth } = menuItem;
    setIndicatorPosition({ left: offsetLeft, width: offsetWidth });
    setActiveMenuItem(menuItem);
  };

  const handleNavbarLeave = () => {
    if (activeMenuItem) {
      const { offsetLeft, offsetWidth } = activeMenuItem;
      setIndicatorPosition({ left: offsetLeft, width: offsetWidth });
    } else {
      setIndicatorPosition({ left: 0, width: 0 });
    }
  };
  // Functions for Nav Indicator

  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <div className="site__logo">
            <Link href="/">
              <Image
                src={logo ? logo : "/logo.png"}
                quality={100}
                width={183}
                height={70}
                alt="Border Rowers"
              />
            </Link>
          </div>
          <div className="nav__container">
            <ul className="nav__list" onMouseLeave={handleNavbarLeave}>
              {navLinks?.map((nav) => (
                <li key={nav.id}>
                  <Link
                    href={nav.route}
                    className={`nav__link ${
                      pathname === nav.route ? "active" : ""
                    }`}
                    onMouseEnter={handleMenuItemHover}
                    onClick={handleMenuItemClick}
                  >
                    {nav.label}
                  </Link>
                </li>
              ))}
              <li className="indicator" style={indicatorPosition}></li>
            </ul>
          </div>
          <div className="nav__btn">
            {(getLoggedInState && pathname.startsWith("/user")) ||
            pathname.startsWith("/organization") ? (
              <button
                className={`btn-main bg-secondary`}
                onClick={handleLogout}
                style={{ marginLeft: "auto" }}
              >
                <span className="btn__text">
                  {isLoading ? <Spin /> : "Logout"}
                </span>
                <span className="btn__icon">
                  <Image
                    src={"/icon _arrow-left.svg"}
                    width={15}
                    height={14}
                    alt="Border Rowers"
                  />
                </span>
              </button>
            ) : (
              <Button
                text={getLoggedInState ? "View Dashboard" : "Login Now"}
                isLight={!isLight ? false : true}
                style={{ marginLeft: "auto" }}
                route={
                  getUserRole && getUserRole == "user"
                    ? "/user/my-profile"
                    : getUserRole && getUserRole == "organization"
                      ? "/organization"
                      : "/login"
                }
              />
            )}
          </div>
          <MobileNav isLight={isLight} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
