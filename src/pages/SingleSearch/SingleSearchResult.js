import React from "react";
import AppendedPhoneItem from "./AppendedPhoneItem";
import Loading from "../../components/Loading";
import UtilService from "../../services/utils";
import { useSelector } from "react-redux";

const SingleSearchResult = () => {

  const [loading, results] = useSelector(state => [state.search.loading, state.search.results]);

  return (
    <div style={{ opacity: loading ? "0.6" : "1" }}>
      <div className="text-center">
        <Loading type="spin" color="#ac0431" />
      </div>

      {results && results.person && results.phones ? (
        <>
          {results.person.PhoneNumbers ? (
            <>
              {results.person.PhoneNumbers.split(",")[0] && <AppendedPhoneItem
                number={results.person.PhoneNumbers.split(",")[0]}
                quality={results.phones.Phone1_Contactability_Score}
                optimal={results.phones.Phone1_Call_Window}
              />}
              {results.person.PhoneNumbers.split(",")[1] && <AppendedPhoneItem
                number={results.person.PhoneNumbers.split(",")[1]}
                quality={results.phones.Phone2_Contactability_Score}
                optimal={results.phones.Phone2_Call_Window}
              />}
              {results.person.PhoneNumbers.split(",")[2] && <AppendedPhoneItem
                number={results.person.PhoneNumbers.split(",")[2]}
                quality={results.phones.Phone3_Contactability_Score}
                optimal={results.phones.Phone3_Call_Window}
              />}
            </>
          ) : (
            <>
              {results.phones.Appended_Phone1 && <AppendedPhoneItem
                number={results.phones.Appended_Phone1}
                quality={results.phones.Appended_Phone1_Contactability_Score}
                optimal={results.phones.Appended_Phone1_Call_Window}
              />}
              {results.phones.Appended_Phone2 && <AppendedPhoneItem
                number={results.phones.Appended_Phone2}
                quality={results.phones.Appended_Phone2_Contactability_Score}
                optimal={results.phones.Appended_Phone2_Call_Window}
              />}
              {results.phones.Appended_Phone3 && <AppendedPhoneItem
                number={results.phones.Appended_Phone3}
                quality={results.phones.Appended_Phone3_Contactability_Score}
                optimal={results.phones.Appended_Phone3_Call_Window}
              />}
            </>
          )}

          <div className='flex justify-center'>
            <button
              className="button fill-button submit-button"
              onClick={() => UtilService.downloadResultPDF(results.person, results.phones)}
            >
              <i className="fa fa-download mr-2" aria-hidden="true" /> DOWNLOAD
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 text-2xl font-bold py-16">No Result</div>
      )}
    </div>
  )
};

export default SingleSearchResult;
