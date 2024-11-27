"use client";
import { useParams } from "next/navigation";
import { useChallengeDetailContentQuery } from "../../../features/api/GetChallengesApi";
import { Footer, Navbar } from "../../../components";
import InnerBanner from "../../../components/InnerBanner/InnerBanner";
import {
  AboutChallenge,
  ChallengeDetails,
  ChallengeRules,
} from "../../../components/Pages/RiverChallenge";
import PreLoader from "../../../components/PreLoader";
import { useEffect } from "react";

const RiverChallenge = () => {
  let { slug } = useParams();
  const { data, isLoading, refetch } = useChallengeDetailContentQuery(slug);
  let challengeDetail = data?.response?.data;

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug, refetch]);
  return (
    <>
      {!isLoading ? (
        <>
          <Navbar isLight={true} />
          <InnerBanner title={challengeDetail?.title} />
          <AboutChallenge
            by={challengeDetail?.created_by}
            title={challengeDetail?.title}
            startDate={challengeDetail?.formated_start_date}
            endDate={challengeDetail?.formated_end_date}
            description={challengeDetail?.description}
            active_participants={challengeDetail?.active_participants}
            participantsImages={challengeDetail?.active_participants_images}
            difficulty_level={challengeDetail?.difficulty_level}
            coverImage={challengeDetail?.cover_image_url}
            slug={slug}
            // New Addition
          />
          <ChallengeDetails
            starDate={challengeDetail?.formated_start_date}
            endDate={challengeDetail?.formated_end_date}
            distance={challengeDetail?.distance}
            importantDetail={challengeDetail?.important_details}
            props={challengeDetail}
          />
          <ChallengeRules
            title={challengeDetail?.title}
            startDate={challengeDetail?.formated_start_date}
            endDate={challengeDetail?.formated_end_date}
            price={challengeDetail?.charges}
            guidline={challengeDetail?.rules_guidelines}
            id={challengeDetail?.id}
            isSubscribed={challengeDetail?.is_subscribed}
          />
          <Footer />
        </>
      ) : (
        <PreLoader />
      )}
    </>
  );
};

export default RiverChallenge;
