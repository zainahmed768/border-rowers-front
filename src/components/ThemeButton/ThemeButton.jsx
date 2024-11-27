import { Button } from "antd";
import { useRouter } from "next/navigation";
import "./index.css";

const ThemeButton = ({ text, route, type, disabled }) => {
  const router = useRouter();
  const handleRoute = (route) => {
    router.push(route);
  };
  return (
    <Button
      type="primary"
      size="large"
      style={{ color: "#052148" }}
      onClick={route ? () => handleRoute(route) : null}
      className="theme__btn"
      htmlType={type}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default ThemeButton;
