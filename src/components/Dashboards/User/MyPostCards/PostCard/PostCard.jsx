"use client";
import { Col, Row, Skeleton } from "antd";
import "./index.css";
import FlipCard from "../../../../FlipCard/FlipCard";
import { useGetPostCardsQuery } from "../../../../../features/api/GetUserStuff";
import Paragraph from "../../../../Paragraph";
import { useEffect, useState } from "react";

const PostCard = ({ isPublic, params }) => {
  // Toolkit
  const { data, isLoading, refetch } = useGetPostCardsQuery({
    filter_by: params,
  });
  const [postCards, setPostCards] = useState([]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    if (data?.response?.data?.length === undefined) {
      if (typeof data?.response?.data == "object") {
        const keys = Object.values(data?.response?.data);
        setPostCards(keys);
      }
    } else {
      setPostCards(data?.response?.data);
    }
  }, [data?.response?.data]);
  return (
    <Row gutter={20}>
      {isLoading ? (
        <Col
          lg={{ span: 12 }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Skeleton paragraph={{ rows: 4 }} active />
        </Col>
      ) : postCards && postCards.length > 0 ? (
        postCards?.map((card) => (
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={card?.id}
          >
            <FlipCard
              id={card?.id}
              title={card?.title}
              description={card?.description}
              isPublic={isPublic}
              distance={card?.distance}
              visibility={card?.visibility}
              frontImage={card?.image_url_front}
              backImage={card?.image_url_back}
              date={card?.date}
              image={card?.image}
              mileston={card?.milestone}
            />
          </Col>
        ))
      ) : (
        <Paragraph text={"No Postcard Found!"} color={"text-primary"} />
      )}
    </Row>
  );
};

export default PostCard;
