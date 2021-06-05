import React, { useEffect } from "react";
import PleaseRead from "./PleaseRead";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  batchSearchStepState,
  chosenFileState,
  headerMappingState,
  mappedCSVDataState,
  selectedCSVDataState
} from "../../recoil/atoms";
import UploadFile from "./UploadFile";
import ConfirmHeaderNames from "./ConfirmHeaderNames";
import MatchHeaderNames from "./MatchHeaderNames";
import MappedCSVDataTable from "./MappedCSVDataTable";

const BatchUploadPage = () => {
  const [step, setStep] = useRecoilState(batchSearchStepState);
  const setFile = useSetRecoilState(chosenFileState);
  const setSelectedCSVData = useSetRecoilState(selectedCSVDataState);
  const setMappedCSVDataState = useSetRecoilState(mappedCSVDataState);
  const setHeaderMappingState = useSetRecoilState(headerMappingState);

  const initBatchUploadData = () => {
    setStep(0)
    setFile(null)
    setSelectedCSVData([])
    setMappedCSVDataState([])
    setHeaderMappingState({
      'Last Name': '',
      'First Name': '',
      'Mailing Address': '',
      'Mailing City': '',
      'Mailing State': '',
      'Mailing Zip': '',
      'Property Address': '',
      'Property City': '',
      'Property State': '',
      'Property Zip': '',
      'Phone 1': '',
      'Phone 2': '',
      'Phone 3': '',
      'Email': ''
    })
  }

  useEffect(() => {
    return initBatchUploadData;
  }, [])

  return (
    <React.Fragment>
      {step === 0 && <PleaseRead />}
      {step === 1 && <UploadFile />}
      {step === 2 && <ConfirmHeaderNames />}
      {step === 3 && <MatchHeaderNames />}
      {step === 4 && <MappedCSVDataTable />}
    </React.Fragment>
  )
}

export default BatchUploadPage;