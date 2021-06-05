import React from "react";
import Loading from "../Loading";

const PageLoader = () => {

  return (
    <div className="text-center mt-1">
      <Loading type="spin" color="#ac0431" height={18} width={18} />
    </div>
  )
}

export default PageLoader;