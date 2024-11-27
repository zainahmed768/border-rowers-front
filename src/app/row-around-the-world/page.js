"use client";
import { Footer, Navbar } from "../../components";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
import {
  AboutRowAroundWorld,
  ParticipantsReviews,
  RecentWinners,
  TopRowers,
} from "../../components/Pages/RowAroundWorld";

const RowArroundWorld = () => {
  return (
    <>
      <Navbar isLight={true}/>
      <InnerBanner title={"Row Around the world"} />
      <AboutRowAroundWorld />
      <ParticipantsReviews />
      <TopRowers />
      <RecentWinners />
      <Footer />
    </>
  );
};

export default RowArroundWorld;
