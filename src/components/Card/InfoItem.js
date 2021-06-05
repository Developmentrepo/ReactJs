import React from 'react';

const InfoItem = (props) => {
  const {label, children} = props;
  return (
    <>
      <strong className="text-xl">{label}</strong>
      <p className="text-xl leading-4 mb-5">{children}</p>
    </>
  )
};

export default InfoItem;