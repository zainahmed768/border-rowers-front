"use client";
import { Col, Pagination, Row, Spin } from "antd";
import DashboardTitle from "../../../components/Dashboards/DashboardTitle";
import AdminLayout from "../../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import SubTitle from "../../../components/SubTitle/SubTitle";
import CardView from "../../../components/Dashboards/CardView/CardView";
import { Navbar } from "../../../components";
import { useGetOrgChallengesQuery } from "../../../features/api/OrganizationApi";
import { useEffect, useState } from "react";

const ViewManage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetOrgChallengesQuery({ page: page });
  const orgChallenges = data?.response?.data?.data;
  useEffect(() => {
    refetch();
  }, [refetch]);
  const handlePageChange = (page) => {
    setPage(page);
    scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <DashboardTitle title={"Organization  Dashboard"} />
        <SubTitle title={"View & Manage Challenges"} />
        <Row gutter={20} style={{ marginTop: "1.5rem" }}>
          {isLoading ? (
            <Spin />
          ) : orgChallenges && orgChallenges.length > 0 ? (
            orgChallenges.map((card) => (
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={card?.id}
              >
                <CardView
                  title={card?.title}
                  route={`view-manage-challenges/${card?.slug}`}
                />
              </Col>
            ))
          ) : (
            "No Challenges Found"
          )}
        </Row>
        <Pagination
          current={page}
          pageSize={data?.response?.data?.per_page}
          onChange={handlePageChange}
          total={data?.response?.data?.total}
          hideOnSinglePage
          responsive
          style={{ marginTop: "14px" }}
        />
      </AdminLayout>
    </>
  );
};

export default ViewManage;
