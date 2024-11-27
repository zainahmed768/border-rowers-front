"use client";
import { Tabs } from "antd";
import "./index.css";
import AllTimeMeter from "../AllTimeMeter/AllTimeMeter";
import ChallengeSpecific from "../ChallengeSpecific/ChallengeSpecific";
import { useSelector } from "react-redux";
import Preheading from "../../../Preheading";
import Button from "../../../Button";
import { getCookie } from "cookies-next";
import { useLeaderboardContentQuery } from "../../../../features/api/LeaderBoardApi";


const LeaderboardTabs = () => {
  const {
    data: dayData,
    isLoading: dayLoading,
    refetch: dayRefetch,
  } = useLeaderboardContentQuery({
    filter_by: "day",
  });
  const {
    data: weekData,
    isLoading: weekLoading,
    refetch: weekRefetch,
  } = useLeaderboardContentQuery({
    filter_by: "week",
  });
  const {
    data: monthkData,
    isLoading: monthkLoading,
    refetch: monthRefetch,
  } = useLeaderboardContentQuery({
    filter_by: "month",
  });
  const {
    data: yearData,
    isLoading: yearLoading,
    refetch: yearRefetch,
  } = useLeaderboardContentQuery({
    filter_by: "year",
  });

  let daysData = dayData?.response?.data;
  let weeksData = weekData?.response?.data;
  let monthsData = monthkData?.response?.data;
  let yearsData = yearData?.response?.data;
  // Check if the user is logged in
  const getLoggedInState = getCookie("token");

  const onChange = (id) => {
    if (id == 1) {
      dayRefetch();
    } else if (id == 2) {
      weekRefetch();
    } else if (id == 3) {
      monthRefetch();
    } else if (id == 4) {
      yearRefetch();
    }
  };

  // Rendering the Tabs Data
  const allTimeMeter = [
    {
      key: "1",
      label: "Day",
      children: (
        <AllTimeMeter param={"day"} data={daysData} loading={dayLoading} />
      ),
    },
    {
      key: "2",
      label: "Week",
      children: (
        <AllTimeMeter param={"week"} data={weeksData} loading={weekLoading} />
      ),
    },
    {
      key: "3",
      label: "Month",
      children: (
        <AllTimeMeter
          param={"month"}
          data={monthsData}
          loading={monthkLoading}
        />
      ),
    },
    {
      key: "4",
      label: "Year",
      children: (
        <AllTimeMeter param={"year"} data={yearsData} loading={yearLoading} />
      ),
    },
  ];
  const challengeSpecific = [
    {
      key: "1",
      label: "Subscribed Challenges",
      children: <ChallengeSpecific />,
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: `All Time Meter`,
      children: <Tabs type="card" items={allTimeMeter} onChange={onChange} />,
    },
    {
      key: "2",
      label: `Challenge Specific`,
      children: getLoggedInState ? (
        <Tabs type="card" items={challengeSpecific} />
      ) : (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <Preheading
            text={"Please Login to Continue"}
            textAlign={"center"}
            color={"text-primary"}
          />
          <Button
            text={"Sign In Now"}
            isLight={false}
            route={"/login?redirect=leaderboard"}
            style={{ margin: "auto" }}
          />
        </div>
      ),
    },
  ];
  // Tabs outer data

  return (
    <div className="LeaderboardTabs">
      <div className="container">
        <Tabs defaultActiveKey="1" items={tabItems} className="full__w-tabs" />
      </div>
    </div>
  );
};

export default LeaderboardTabs;
