import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

const Loading = props => {

  const loading = useSelector(state => state.user.loading || state.search.loading || state.authorizenet.loading);

  const height = props.height ? props.height : 36;
  const width = props.width ? props.width : 36;

  return (
    loading && (
      <div className='pl-2' style={{ display: "inline-block"}}>
        <ReactLoading
          type={props.type}
          color={props.color}
          height={height}
          width={width}
        />
      </div>
    )
  );
};

export default Loading;
