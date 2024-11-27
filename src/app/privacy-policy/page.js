"use client";
import InnerBanner from "../../components/InnerBanner/InnerBanner";
import { Footer, Navbar } from "../../components";

import { Skeleton } from "antd";
import { useGetAllPagesQuery } from "../../features/api/pagesApi";
import { PageMetas } from "../../utils/utils";

const PrivacyPolicy = () => {
  const { data, isLoading } = useGetAllPagesQuery("privacy-policy");
  const metaInfo = PageMetas("Privacy Policy");
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
      <div className="legal">
        <InnerBanner title={data?.response?.data?.page_title} />
        <div className="container legal-content">
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 10 }} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: data?.response?.data?.content,
              }}
            ></div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
