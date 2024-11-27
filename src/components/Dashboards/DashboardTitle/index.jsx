import CustomHeading from "../../CustomHeading";

const DashboardTitle = ({ title }) => {
  return (
    <CustomHeading
      text={title}
      weight={700}
      color={"text-primary"}
      margin={"0 0 30px 0"}
    />
  );
};

export default DashboardTitle;
