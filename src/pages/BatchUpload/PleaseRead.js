import React from "react";
import { useSetRecoilState } from "recoil";
import { batchSearchStepState } from "../../recoil/atoms";

const PleaseRead = () => {
  const setStep = useSetRecoilState(batchSearchStepState)

  const handleClick = () => {
    setStep(1)
  }

  return (
    <div className='container mt-3 text-center'>
      <img src="resources/images/stop-please-read.png" width={360} />

      <div className="p-4" style={{ fontSize: '1.4rem' }}>
        Your file must be formatted exactly as indicated in our template. If you received lower than 80% hit rate, you
        may have formatted your data incorrectly. Check your file to confirm the format as required by our system and
        try again.
      </div>

      <div className="p-4">
        <a
          href='https://drive.google.com/file/d/18r_aVOnLOro6aGSxj5oEq9F7A8Kttv5W'
          target='_blank'
          rel="Download template"
        >
          <button id="btn_download_template" className='small-button border-button m-1'>
            <i className="fa fa-download mr-2" aria-hidden="true" />
            DOWNLOAD THIS TEMPLATE
          </button>
        </a>
      </div>

      <div>
        <button className='button submit-button fill-button' onClick={handleClick}>
          FILE UPLOADER
        </button>
      </div>
    </div>
  )
}

export default PleaseRead;