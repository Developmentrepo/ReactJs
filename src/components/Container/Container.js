import React from "react";
import clsx from 'clsx';

const Container = (props) => {
  const { className } = props;
  return (
    <div className={clsx("flex justify-center", className)}>
      <div className="xl:w-9/12 lg:w-full md:w-full sm:w-full">
        {props.children}
      </div>
    </div>
  )
};

export default Container;