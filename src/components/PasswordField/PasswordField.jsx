import { EyeInvisibleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import "../InputField/index.css";
import Image from "next/image";

const PasswordField = ({ required, message, placeholder, name }) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required ? true : false,
          message: `Please Enter ${message}`,
        },
      ]}
    >
      <Input.Password
        placeholder={placeholder}
        iconRender={(visible) =>
          visible ? (
            <EyeInvisibleOutlined />
          ) : (
            <Image
              src={"/eye.svg"}
              width={18}
              height={12}
              alt="Border Rowers"
            />
          )
        }
      />
    </Form.Item>
  );
};

export default PasswordField;
