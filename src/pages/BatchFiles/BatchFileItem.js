import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import actions from "../../redux/batch/actions";
import "./BatchFileItem.scss"
import BatchSearchService from "../../services/batchsearch";
import { config } from "../../config";

const BatchFileItem = (props) => {
  const { file } = props;
  const dispatch = useDispatch();

  const handleDownload = async () => {
    try {
      const resp = await BatchSearchService.download(file.id);
      console.log('file download', resp);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (file.status == 2) {
        clearInterval(interval);
      }

      dispatch({
        type: actions.GET_FILE,
        payload: file.id
      })
    }, 10000);

    return () => clearInterval(interval);
  }, [])

  return (
    <tr>
      <td style={{width: '3%'}}>
        {file.status == 0 &&
        <i className="fa fa-minus" style={{ width: '24px', height: '24px' }} aria-hidden="true" />}
        {file.status == 1 && <ReactLoading type="spin" color="#aaaaaa" height={24} width={24} />}
        {file.status == 2 &&
        <i className="fa fa-check" style={{ width: '24px', height: '24px' }} aria-hidden="true" />}
      </td>
      <td style={{width: '33%'}}>
        <div>{file.file}</div>
        <div>{file.created_at}</div>
      </td>
      <td style={{width: '8%'}}>
        <div>{file.rows}</div>
        <div>Rows</div>
      </td>
      <td style={{width: '8%'}}>
        <div>{file.matches}</div>
        <div>Matches</div>
      </td>
      <td style={{width: '8%'}}>
        <div>${Number(file.savings_cost).toFixed(2)}</div>
        <div>Savings</div>
      </td>
      <td style={{width: '8%'}}>
        <div>{file.hits}</div>
        <div>Hits</div>
      </td>
      <td style={{width: '8%'}}>
        <div>{Number((file.hits * 100 / file.rows).toFixed(2))}%</div>
        <div>Hits %</div>
      </td>
      <td style={{width: '8%'}}>
        <div>${Number(file.cost).toFixed(2)}</div>
        <div>Cost{file.transaction_id && '(paid)'}</div>
      </td>
      <td style={{width: '8%'}}>
        <div>{file.is_suppress == 1 ? 'Yes' : 'No'}</div>
        <div>Suppress</div>
      </td>
      <td style={{width: '8%'}}>
        {file.status == 2 &&
        <a href={`${config.API_BASE_URL}/api/batchsearch/download.php?id=${file.id}`}>
          <i className="fa fa-download" aria-hidden="true" onClick={handleDownload} />
        </a>}
      </td>
    </tr>
  )
}

export default BatchFileItem;
