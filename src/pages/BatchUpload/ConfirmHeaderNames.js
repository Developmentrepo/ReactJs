import React, { useEffect } from "react";
import './_table.scss';
import { batchSearchStepState, selectedCSVDataState } from "../../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil/dist";

const ConfirmHeaderNames = () => {
  const setStep = useSetRecoilState(batchSearchStepState);
  const selectedCSVData = useRecoilValue(selectedCSVDataState);

  const handleNext = () => {
    setStep(3);
  }

  const handleBack = () => {
    setStep(1);
  }

  useEffect(() => {
    if (selectedCSVData.length < 3) {
      handleBack();
    }
  }, [])

  return (
    <div className='container mt-3'>
      <h3 className="col-sm-12 mb-4">
        Batch Upload
      </h3>

      <div className="check-header">
        <div>Does this contain header names?</div>
        <div className="overflow-auto">
          <table>
            <thead>
            <tr>
              {selectedCSVData[0].map((headerName, i) => <th key={i}>{headerName}</th>)}
            </tr>
            </thead>
            <tbody>
            {selectedCSVData.slice(1, 3).map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((col, i) => <td key={i}>{col}</td>)}
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <button className="button small-button fill-button mr-2" onClick={handleNext}>
            YES
          </button>

          <button className="button small-button border-button ml-2" onClick={handleBack}>
            NO
          </button>
        </div>
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

export default ConfirmHeaderNames;