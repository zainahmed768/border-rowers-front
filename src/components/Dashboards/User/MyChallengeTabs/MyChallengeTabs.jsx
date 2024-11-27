import { Tabs } from "antd";
import "../MyTeam/index.css";
import MyChallengeCard from "../UserChallengeCard/MyChallengeCard";
import { useEffect, useState } from "react";
import { useGetUserChallengeQuery } from "../../../../features/api/GetChallengesApi";

const MyChallengeTabs = () => {
  const [page, setPage] = useState(1);
  const {
    data: allData,
    isLoading: allLoading,
    refetch: allRefetch,
  } = useGetUserChallengeQuery({
    page: page,
    filter_by: "all",
  });
  const {
    data: startedData,
    isLoading: startedLoading,
    refetch: startedRefetch,
  } = useGetUserChallengeQuery({
    page: page,
    filter_by: "started",
  });
  const {
    data: endedData,
    isLoading: endedLoading,
    refetch: endedRefetch,
  } = useGetUserChallengeQuery({
    page: page,
    filter_by: "ended",
  });
  // console.log(allData, 'all ')

  const handlePageChange = (page) => {
    setPage(page);
    scrollTo({ top: 0, behavior: "smooth" });
  };
  // Nav tabs
  const tabItems = [
    {
      key: "1",
      label: `All`,
      children: (
        <MyChallengeCard
          param={"all"}
          data={allData}
          loading={allLoading}
          handlePageChange={handlePageChange}
          page={page}
        />
      ),
    },
    {
      key: "2",
      label: `Ongoing`,
      children: (
        <MyChallengeCard
          param={"started"}
          data={startedData}
          loading={startedLoading}
          handlePageChange={handlePageChange}
          page={page}
        />
      ),
    },
    {
      key: "3",
      label: `Completed`,
      children: (
        <MyChallengeCard
          param={"ended"}
          data={endedData}
          loading={endedLoading}
          handlePageChange={handlePageChange}
          page={page}
        />
      ),
    },
  ];

  const onChange = (id) => {
    if (id == 1) {
      allRefetch();
    } else if (id == 2) {
      startedRefetch();
    } else if (id == 3) {
      endedRefetch();
    }
  };

  return (
    <div className="panel__tabs">
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        className="full__w-tabs"
        onChange={onChange}
      />
    </div>
  );
};

export default MyChallengeTabs;
