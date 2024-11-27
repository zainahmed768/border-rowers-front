import React from "react";
import "./Paragraph.css";

const Paragraph = ({
  text,
  color,
  Textcolor,
  textAlign,
  margin,
  weight,
  size,
  textTransform,
}) => {
  return (
    <p
      className={`app__para ${size ? "small" : "normal"} ${color}`}
      style={{
        color: Textcolor,
        textAlign: textAlign,
        margin: margin,
        fontWeight: weight,
        fontSize: `${size}px!important`,
        textTransform: textTransform,
      }}
    >
      {text}
    </p>
  );
};

export default Paragraph;
