import "./index.css";
import CustomHeading from "../CustomHeading";
import { Breadcrumb } from "antd";
import Link from "next/link";

const InnerBanner = ({ title, breadcrumb }) => {
  return (
    <div className="inner__banner">
      <CustomHeading
        text={title}
        weight={700}
        color={"text-white"}
        fontSize={"big"}
        margin={0}
      />
      {breadcrumb && (
        <Breadcrumb
          style={{ marginBottom: "20px" }}
          items={[
            {
              title: <Link href="/leaderboard">Leaderboards</Link>,
            },
            {
              title: <Link href="#">Challenge Specific</Link>,
            },
          ]}
        />
      )}
    </div>
  );
};

export default InnerBanner;
