import { Form, Select } from "antd";
import "./index.css";

const SelectField = ({
  options,
  defaultValue,
  width,
  required,
  message,
  name,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      // initialValue={defaultOption ? defaultOption : defaultValue}
      rules={[
        {
          required: required ? true : false,
          message: `Please Select ${message}`,
        },
      ]}
    >
      <Select
        onChange={onChange}
        defaultValue={defaultValue}
        options={options}
        style={{ width: width }}
      />
    </Form.Item>
  );
};

export default SelectField;
