"use client";
import { Footer, Navbar } from "../components";
import {
  AboutSec,
  Banner,
  Participate,
  RowingChallenges,
  OurApplication,
  Expertise,
  Testimonials,
} from "../components/Pages/Home";
import { PageMetas } from "../utils/utils";

const HomePage = () => {
  const metaInfo = PageMetas("Home");
  return (
    <>
      <head>
        <title>
          {metaInfo?.meta_title ? metaInfo?.meta_title : "Border Rowers"}
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
      <Banner />
      <Participate />
      <AboutSec />
      <RowingChallenges />
      <OurApplication />
      <Expertise />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
