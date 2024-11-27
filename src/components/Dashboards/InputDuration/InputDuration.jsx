import { useState } from "react";
import "./index.css";

const InputDuration = ({ tag, label, disabled, placeholder, fieldValue }) => {
  const [value, setValue] = useState("");

  return (
    <label className="input__duration">
      <div className="duration__inner">
        <input
          type="text"
          placeholder={placeholder ? placeholder : "00"}
          maxLength={2}
          value={fieldValue == null ? 0 : fieldValue}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled ? true : false}
        />
        <h3>{tag}</h3>
      </div>
      {label && <h4>{label}</h4>}
    </label>
  );
};

export default InputDuration;
