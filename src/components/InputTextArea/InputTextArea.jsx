import { Form, Input } from "antd";
const { TextArea } = Input;

const InputTextArea = ({ placeholder, required, message, name }) => {
  return (
    <Form.Item
    name={name}
      rules={[
        {
          required: required ? true : false,
          message: `Please Input ${message}`,
        },
      ]}
    >
      <TextArea
        rows={4}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default InputTextArea;
