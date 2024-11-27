import Image from "next/image";
import React from "react";
import CustomHeading from "../CustomHeading";
import Paragraph from "../Paragraph";
import "./AuthSide.css";
import Link from "next/link";
const AuthSide = () => {
  return (
    <div className="auth__side">
      <div className="container">
        <div className="auth__content">
          <Link href={"/"}>
            <Image
              src={"/logo-thumb.png"}
              width={181}
              height={195}
              alt="Border Rower"
            />
          </Link>
          <CustomHeading
            text={"Connect with people for "}
            color={"text-white"}
            weight={700}
            margin={0}
          />
          <CustomHeading
            text={"rowing challenges"}
            color={"text-secondary"}
            weight={700}
            margin={0}
          />
          <Paragraph
            text={
              "Our world is facing unprecedented challenges every day. Border Rowers is a virtual community"
            }
            color={"text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSide;
