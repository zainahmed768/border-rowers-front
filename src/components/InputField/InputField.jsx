import { Form, Input } from "antd";
import "./index.css";
const InputField = ({
  type,
  placeholder,
  required,
  message,
  disabled,
  name,
  validator,
  maxLength,
  presetValue,
}) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required ? true : false,
          message: maxLength
            ? `Please Input At Least ${maxLength} ${type == 'number' ? 'Number' : 'Characters'}`
            : validator
              ? `Please Enter ${name} In Alphabets`
              : `Please Enter ${message}`,
          pattern: validator ? validator : null,
        },
      ]}
    >
      <Input
        placeholder={placeholder}
        type={type}
        disabled={disabled ? true : false}
        defaultValue={presetValue ? presetValue : null}
        step={"any"}
        maxLength={maxLength}
      />
    </Form.Item>
  );
};

export default InputField;
