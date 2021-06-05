import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerMappingState, selectedCSVDataState } from "../../recoil/atoms";

const MatchHeaderNameItem = (props) => {
  const { header } = props;
  const selectedCSVData = useRecoilValue(selectedCSVDataState);
  const [headerMapping, setHeaderMapping] = useRecoilState(headerMappingState);

  const handleChange = (event) => {
    setHeaderMapping({ ...headerMapping, [header]: event.target.value });
  }

  return (
    <div className="row py-2 my-2" style={{ backgroundColor: '#fafafa', borderRadius: '4px' }}>
      <div className="col-12 col-md-6">
        <div className="d-flex w-100">
          <div className="d-flex align-items-center font-weight-bold" style={{ flex: '1 1 0%' }}>
            {header}
          </div>
          <div className="d-flex align-items-center" style={{ flex: '1 1 0%' }}>
            <select className="border-0 w-100" onChange={handleChange}>
              <option></option>
              {selectedCSVData[0].map((csvHeader, i) => <option value={csvHeader} key={i}>{csvHeader}</option>)}
            </select>
          </div>
        </div>
        <div className="w-100">
          {/* TODO: selected data table */}
        </div>
      </div>
      <div className="col-12 col-md-6">
        {headerMapping[header] && <>Matched to the <span
          className="font-weight-bold">{headerMapping[header]}</span> field.</>}
      </div>
    </div>
  )
}

export default MatchHeaderNameItem;