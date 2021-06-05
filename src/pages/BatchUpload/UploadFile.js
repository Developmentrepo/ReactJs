import React, { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { batchSearchStepState, chosenFileState, selectedCSVDataState } from "../../recoil/atoms";
import UtilService from "../../services/utils";
import { NotificationManager } from "react-notifications";
import { CSVReader } from "react-papaparse"

const UploadFile = () => {
  const setStep = useSetRecoilState(batchSearchStepState);
  const [file, setFile] = useRecoilState(chosenFileState);
  const [selectedCSVData, setSelectedCSVData] = useRecoilState(selectedCSVDataState);

  const fileRef = useRef();
  const buttonRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  }

  const onFileChange = (e) => {
    const chosenFile = e.target.files[0];
    const fileExtension = UtilService.getFileExtension(chosenFile.name);
    if (['csv', 'xls', 'xlsx'].includes(fileExtension)) {
      setFile(chosenFile);

      setStep(2)
    } else {
      NotificationManager.error(
        'You can upload a .csv, .xls, or a xlsx with headers.',
        'File Type Error',
      );
    }
  }

  const handleOnFileLoad = (data, file) => {
    if (data.length < 2) {
      NotificationManager.error('Please confirm your file content again.');
      return;
    }

    setSelectedCSVData(data.map(data => data.data))
    setFile(file)

    setStep(2)
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data) => {
    setSelectedCSVData(data)
  }

  return (
    <div className="container mt-3">
      <div className="row py-2" style={{ border: 'dashed 1px #aaaaaa' }}>
        <h3 className="col-sm-12 mb-4">
          Batch Upload
        </h3>

        <div className="col-sm-12 col-md-4">
          {/*<input ref={fileRef} type="file" onChange={onFileChange} hidden />*/}
          {/*<button className="button small-button fill-button" onClick={handleClick}>*/}
          {/*  <i className="fa fa-upload mr-2" aria-hidden="true" />*/}
          {/*  UPLOAD YOUR RECODES*/}
          {/*</button>*/}
          {/*<div>{file && file.name}</div>*/}

          <CSVReader
            ref={buttonRef}
            onFileLoad={handleOnFileLoad}
            onError={handleOnError}
            onRemoveFile={handleOnRemoveFile}
            noDrag
            addRemoveButton
          >
            UPLOAD YOUR RECODES
          </CSVReader>
        </div>
        <div className="col-sm-12 col-md-8">
          You can upload a .csv, .xls, or a xlsx with headers. The next step will let you match your header names to the
          correct data points. You will be able to clean up or remove any invalid data before finalizing your report.
        </div>
      </div>
    </div>
  )
}

export default UploadFile;