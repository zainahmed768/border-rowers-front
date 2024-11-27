"use client";
import { Col, Pagination, Row, Spin } from "antd";
import AdminLayout from "../../components/Dashboards/DashboardsLayout/AdminLayout/AdminLayout";
import DashboardTitle from "../../components/Dashboards/DashboardTitle";
import SubTitle from "../../components/SubTitle/SubTitle";
import CardView from "../../components/Dashboards/CardView/CardView";
import { Navbar } from "../../components";
import { useState } from "react";
import { useGetOrgChallengesQuery } from "../../features/api/OrganizationApi";

const ViewUsers = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetOrgChallengesQuery({ page: page });
  const challangesData = data?.response?.data;
  const handlePageChange = (page) => {
    setPage(page);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar logo={"/logo-dark.png"} isLight={false} />
      <AdminLayout>
        <DashboardTitle title={"Organization  Dashboard"} />
        <SubTitle title={"View Users"} />
        <Row gutter={20} style={{ marginTop: "1.5rem" }}>
          {isLoading ? (
            <Spin />
          ) : challangesData && challangesData?.data.length > 0 ? (
            challangesData?.data?.map((card) => (
              <Col
                lg={{ span: 12 }}
                md={{ span: 12 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
                key={card?.id}
              >
                <CardView
                  title={card?.title}
                  route={card?.slug}
                  details={card?.description}
                />
              </Col>
            ))
          ) : (
            "No Challenges Found"
          )}
        </Row>
        <Pagination
          current={page}
          pageSize={challangesData?.per_page}
          onChange={handlePageChange}
          total={challangesData?.total}
          hideOnSinglePage
          responsive
          style={{ marginTop: "14px" }}
        />
      </AdminLayout>
    </>
  );
};

export default ViewUsers;
