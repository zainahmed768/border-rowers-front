"use client";
import { Footer, Navbar } from "../../components";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
import { LeaderboardTabs } from "../../components/Pages/Leaderboards";
import { PageMetas } from "../../utils/utils";

const Leaderboards = () => {
  const metaInfo = PageMetas("Leaderboard");
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
      <InnerBanner title={"Leaderboard"} />
      <LeaderboardTabs />
      <Footer />
    </>
  );
};

export default Leaderboards;
