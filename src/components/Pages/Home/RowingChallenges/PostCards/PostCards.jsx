import Image from "next/image";
import "./index.css";
import { Typography } from "antd";
import Paragraph from "../../../../Paragraph";
import { useRouter } from "next/navigation";

// const { Title, Text } = Typography;

const PostCards = ({
  title,
  postedBy,
  description,
  image,
  active,
  handleClick,
  id,
  endDate,
  startDate,
  slug,
  index,
}) => {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };
  return (
    <div
      className={`post__card ${active === index + 1 ? "active" : ""}`}
      onClick={() => handleClick(index + 1)}
    >
      <div className="card__image">
        <Image src={image} alt="Border Rower" fill sizes="100vw" />
      </div>
      <div className="card__content-wrapp">
        {active == index + 1 && (
          <Typography.Text className="text-secondary posted__by">
            {postedBy}
          </Typography.Text>
        )}
        {active !== index + 1 ? (
          <Typography.Title level={4} className="text-white post__title">
            {title.length > 22 ? `${title.substring(0, 22)}...` : title}
          </Typography.Title>
        ) : (
          <div className="post__card-content">
            <Typography.Title level={4} className="text-white post__title">
              {title}
            </Typography.Title>
            <Typography.Text className="text-white">{`${startDate} to ${endDate}`}</Typography.Text>
            <Paragraph
              color={"text-white"}
              text={description.substring(0, 100)}
            />
            <button onClick={() => handleRoute(`/challenges/${slug}`)}>
              Join Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCards;
