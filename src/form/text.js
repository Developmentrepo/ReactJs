import React from 'react';
import './style.scss';

const Text = props => {

  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = 'form-control control-error';
  }

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className={formControl} {...props} />
    </div>
  );
};

export default Text;
