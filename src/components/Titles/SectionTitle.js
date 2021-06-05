import React from "react";

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: 700,
}

const SectionTitle = (props) => {
  const { title } = props;
  return (
    <div
      style={{ ...titleStyle }}
    >
      {title}
    </div>
  )
};

export default SectionTitle;