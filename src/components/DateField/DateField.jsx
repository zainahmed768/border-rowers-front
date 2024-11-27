import { DatePicker, Form } from "antd";
import "../InputField/index.css";
import "./index.css";
const DateField = ({
  placeholder,
  name,
  message,
  onchange,
  defaultValue,
  required,
}) => {
  const dateFormat = "YYYY/MM/DD";
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required == false ? false : true,
          message: `Please Input ${message}`,
        },
      ]}
      style={{ margin: "0 !important" }}
    >
      <DatePicker
        defaultValue={defaultValue}
        format={dateFormat}
        placeholder={placeholder}
        style={{ margin: "0 !important" }}
        onChange={onchange}
      />
    </Form.Item>
  );
};

export default DateField;
