import { Checkbox } from "antd";
import Paragraph from "../Paragraph";
import { Form } from "antd";

const InputCheckbox = ({ label, onchange, name }) => {
//  console.log(onchange)
  return (
    <Form.Item name={name} noStyle valuePropName="checked">
      <Checkbox onChange={onchange}>
        <Paragraph text={label} margin={0} />
      </Checkbox>
    </Form.Item>
  );
};

export default InputCheckbox;
