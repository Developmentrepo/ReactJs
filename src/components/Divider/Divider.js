import React from "react";

const Divider = (props) => {

  return (
    <div
      className={props.className}
      style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#afafaf',
        ...props.style
      }}
    />
  )
};

export default Divider;
