import React, { useEffect } from "react";
import { history } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import BatchFileItem from "./BatchFileItem";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";

const BatchFilesPage = () => {
  const dispatch = useDispatch();
  const { files, loading } = useSelector(state => state.batch)

  useEffect(() => {
    dispatch({
      type: 'batch/GET_FILES'
    })
  }, [])

  return (
    <React.Fragment>
      <Container>
        <div className="flex items-center">
          <PageTitle
            title="BATCH SEARCH"
            position="left"
          />

          <div className="flex-grow flex justify-end">
            <button
              className="button submit-button fill-button"
              onClick={() => history.push('/search/batch/upload')}
            >
              UPLOAD YOUR LIST
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-100" style={{minWidth: '600px'}}>
            <tbody>
            {
              files.map(file => <BatchFileItem file={file} key={file.id} />)
            }
            </tbody>
          </table>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default BatchFilesPage;