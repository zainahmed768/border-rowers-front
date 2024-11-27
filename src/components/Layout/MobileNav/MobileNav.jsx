import { useEffect, useRef } from "react";
import { gsap, Power4 } from "gsap";
import { navLinks } from "../../../constants";
import Link from "next/link";
import "./MobileNav.css";
import { getCookie } from "cookies-next";
const MobileNav = ({ isLight }) => {
  // Get Cookies Data
  const getUserRole = getCookie("role");
  const getLoggedInState = getCookie("token");
  const navigationRef = useRef(null);

  useEffect(() => {
    const nav = navigationRef.current;
    const menuButton = nav.querySelector(".menu-button");
    const closeButton = nav.querySelector(".close-button");
    const mobileNavWrapp = nav.querySelectorAll(".mobile__nav-wrapp");
    const menuItem = nav.querySelectorAll(".mobile__nav-wrapp p");

    const tl = gsap.timeline({ paused: true });

    tl.to(mobileNavWrapp, { x: 0, ease: Power4.ease });
    tl.from(menuItem, {
      stagger: 0.1,
      opacity: 0,
      x: 10,
    });

    const openNavigation = () => {
      tl.play();
    };

    const closeNavigation = () => {
      tl.reverse();
    };

    menuButton.addEventListener("click", openNavigation);
    closeButton.addEventListener("click", closeNavigation);

    return () => {
      menuButton.removeEventListener("click", openNavigation);
      closeButton.removeEventListener("click", closeNavigation);
    };
  }, []);

  return (
    <div className="mobile-navigation" ref={navigationRef}>
      <button className={`menu-button ${!isLight ? "dark-button" : ""}`}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="mobile__nav-wrapp">
        <button className="close-button">&times;</button>
        <ul className="menu-items">
          {navLinks?.map((nav) => (
            <li key={nav?.id}>
              <p>
                <Link href={nav.route}>{nav.label}</Link>
              </p>
            </li>
          ))}
          <li>
            <p>
              <Link
                href={
                  getLoggedInState && getUserRole == "user"
                    ? "/user/my-profile"
                    : getUserRole == "organization"
                    ? "/organization"
                    : "/login"
                }
              >
                {getLoggedInState ? "View Dashboard" : "Login Now"}
              </Link>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
