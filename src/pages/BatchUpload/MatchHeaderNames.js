import React, { useEffect } from "react";
import { batchSearchStepState, headerMappingState } from "../../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MatchHeaderNameItem from "./MatchHeaderNameItem";

const MatchHeaderNames = () => {
  const setStep = useSetRecoilState(batchSearchStepState);
  const headerMapping = useRecoilValue(headerMappingState);

  const handleNext = () => {
    setStep(4);
  }

  const handleBack = () => {
    setStep(2);
  }

  return (
    <div className='container mt-3'>
      <h3 className="col-sm-12 mb-4">
        Batch Upload
      </h3>

      <div>
        {Object.keys(headerMapping).map((header, i) => <MatchHeaderNameItem header={header} key={i} />)}
      </div>

      <div className="mt-3">
        <button className="button small-button fill-button mr-2" onClick={handleNext}>
          CONFIRM
        </button>
      </div>

      <div className="mt-5">
        <button className="no-border-button" onClick={handleBack}>
          <i className="fa fa-angle-left mr-2" aria-hidden="true" />
          Back
        </button>
      </div>
    </div>
  )
}

export default MatchHeaderNames;