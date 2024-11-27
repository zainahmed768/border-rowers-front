import { Col, Row, Spin } from "antd";
import TrophyCard from "../TrophyCard/TrophyCard";
import { useGetTrohpiesQuery } from "../../../../../features/api/GetUserStuff";
import Paragraph from "../../../../Paragraph";

const Trophy = ({ isPublic, params }) => {
  // Toolkit
  const { data, isLoading } = useGetTrohpiesQuery({
    filter_by: params,
  });
  const trophies = data?.response?.data
    ? Object.values(data?.response?.data)
    : [];
  return (
    <Row gutter={20}>
      {isLoading ? (
        <Spin />
      ) : trophies && trophies.length > 0 ? (
        trophies?.map((card) => (
          <Col
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            key={card?.id}
          >
            <TrophyCard
              title={card?.title}
              date={card?.date}
              distanceCovered={card?.distance}
              id={card?.id}
              image={card?.image}
              challenge={card?.challenge}
              type={card?.trophy_type}
              isPublic={isPublic}
              visibility={card?.visibility}
            />
          </Col>
        ))
      ) : (
        <Paragraph text={"No Trophies Found"} color={"text-primary"} />
      )}
    </Row>
  );
};

export default Trophy;
