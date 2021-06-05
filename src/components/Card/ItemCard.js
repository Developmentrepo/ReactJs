import React from 'react';
import clsx from 'clsx';

const ItemCard = (props) => {
  const { title, children, className } = props;
  return (
    <div className={clsx("flex w-full p-2 justify-center items-start", className)}>
      <div
        className="flex w-full flex-col py-6 border border-gray-900 text-center"
        style={{ borderTopLeftRadius: "24px" }}
      >
        <div className="text-2xl font-bold">{title}</div>
        {children}
      </div>
    </div>
  )
};

export default ItemCard;