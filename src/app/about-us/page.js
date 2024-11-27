"use client";

import Head from "next/head";
import { Footer, Navbar } from "../../components";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
import {
  FamousRowChallenge,
  HowItStarted,
  Staff,
  WhyChoose,
} from "../../components/Pages/AboutUs";
import { Testimonials } from "../../components/Pages/Home";
import { PageMetas } from "../../utils/utils";

const AboutPage = () => {
  const metaInfo = PageMetas("About Us");
  return (
    <>
      <head>
        <title>
          {metaInfo?.meta_title ? metaInfo?.meta_title : "About Us"}
        </title>
        <meta
          name="description"
          content={
            metaInfo?.meta_description
              ? metaInfo?.meta_description
              : "Border Rowers"
          }
        ></meta>
      </head>
      <Navbar isLight={true} />
      <InnerBanner title={"About Us"} />
      <HowItStarted />
      <WhyChoose />
      <FamousRowChallenge />
      <Staff />
      <Testimonials />
      <Footer />
    </>
  );
};

export default AboutPage;
