import React from 'react';
import './style.scss'

const TextArea = props => {

  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = 'form-control control-error';
  }

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <textarea {...props} className={formControl} />
    </div>
  );
};

export default TextArea;
