import React from "react";
import clsx from "clsx";

const PageTitle = (props) => {
  const { position = "middle", title, subtitle = "", className } = props;
  return (
    <div className="py-1">
      <div
        className={clsx(
          className,
          position === "middle" ? "text-center" : "text-left",
          "font-bold mb-2 md:text-5xl sm:text-4xl text-4xl"
        )}
      >
        {title}
      </div>
      {
        subtitle && (
          <div
            className={clsx(
              position === "middle" ? "text-center" : "text-left",
              "font-light text-xl"
            )}
          >
            {subtitle}
          </div>
        )
      }
    </div>
  )
};

export default PageTitle;