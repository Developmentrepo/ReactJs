import React, { useEffect, useState } from "react";
import {
  batchSearchStepState,
  chosenFileState,
  headerMappingState,
  mappedCSVDataState,
  selectedCSVDataState,
} from "../../recoil/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import "./_table.scss";
import ReactModal from "react-modal";
import ToggleButton from "react-toggle-button";
import { confirmAlert } from "react-confirm-alert";
import BatchSearchService from "../../services/batchsearch";
import UtilService from "../../services/utils";
import { NotificationManager } from "react-notifications";
import { history } from "../../index";
import { useSelector } from "react-redux";

const MappedCSVDataTable = () => {
  const { subscription } = useSelector((state) => state.authorizenet);
  const setStep = useSetRecoilState(batchSearchStepState);
  const mappedHeader = useRecoilValue(headerMappingState);
  const selectedCSVData = useRecoilValue(selectedCSVDataState);
  const [mappedCSVData, setMappedCSVData] = useRecoilState(mappedCSVDataState);
  const chosenFile = useRecoilValue(chosenFileState);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSuppress, setIsSuppress] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    setIsOpenModal(false);
    if (isSuppress) {
      await handleSubmit();
    } else {
      confirmAlert({
        title: "Are you read to submit without Sussress Against Database?",
        message: "",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await handleSubmit();
            },
          },
          {
            label: "No",
            onClick: () => {
              setIsOpenModal(true);
            },
          },
        ],
        childrenElement: () => <></>,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      filename: chosenFile.name,
      data: mappedCSVData,
      is_suppress: isSuppress ? 1 : 0,
    };

    const response = await BatchSearchService.upload(data);
    if (response && response.data) {
      const resp = UtilService.parserResponse(response.data);

      if (resp.success && resp.data) {
        history.push("/search/batch/files");
      } else {
        NotificationManager.error(
          resp ? resp.message : "Batch List Uploading Error.",
          "Error"
        );
      }
    }

    setLoading(false);
  };

  const handleBack = () => {
    setStep(3);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const getMappedIndexOfKeys = () => {
    const indexOfKeys = {};

    Object.keys(mappedHeader).map((key) => {
      const mappedKey = mappedHeader[key];
      if (mappedKey) {
        indexOfKeys[key] = selectedCSVData[0].findIndex(
          (item) => item === mappedKey
        );
      } else {
        indexOfKeys[key] = -1;
      }
    });

    return indexOfKeys;
  };

  useEffect(() => {
    const indexOfKeys = getMappedIndexOfKeys();
    // const headers = Object.keys(mappedHeader);
    const headers = [
      "Last Name",
      "First Name",
      "Mailing Address",
      "Mailing City",
      "Mailing State",
      "Mailing Zip",
      "Property Address",
      "Property City",
      "Property State",
      "Property Zip",
      "Phone Numbers",
      "Email",
    ];
    const bodies = selectedCSVData.slice(1).map((row) => {
      const convertedRow = headers.map((key) => {
        if (key === "Phone Numbers") {
          let PhoneNumbers = "";
          if (indexOfKeys["Phone 1"] > 0 && row[indexOfKeys["Phone 1"]]) {
            PhoneNumbers += row[indexOfKeys["Phone 1"]] + ",";
          }
          if (indexOfKeys["Phone 2"] > 0 && row[indexOfKeys["Phone 2"]]) {
            PhoneNumbers += row[indexOfKeys["Phone 2"]] + ",";
          }
          if (indexOfKeys["Phone 3"] > 0 && row[indexOfKeys["Phone 3"]]) {
            PhoneNumbers += row[indexOfKeys["Phone 3"]] + ",";
          }

          return PhoneNumbers;
        }

        if (indexOfKeys[key] < 0) {
          return "";
        } else {
          return row[indexOfKeys[key]];
        }
      });

      if (
        convertedRow[0] ||
        convertedRow[1] ||
        convertedRow[3] ||
        convertedRow[4] ||
        convertedRow[5] ||
        convertedRow[6] ||
        convertedRow[7] ||
        convertedRow[8] ||
        convertedRow[9] ||
        convertedRow[10] ||
        convertedRow[11]
      ) {
        return convertedRow;
      }
    });

    const filtered_bodies = bodies.filter(
      (row) =>
        row &&
        (row[0] ||
          row[1] ||
          row[3] ||
          row[4] ||
          row[5] ||
          row[6] ||
          row[7] ||
          row[8] ||
          row[9] ||
          row[10] ||
          row[11])
    );

    // TODO: delete empty data rows from list
    if (filtered_bodies.length > 0) {
      setMappedCSVData([headers, ...filtered_bodies]);
    } else {
      setStep(0);
    }
  }, []);

  return (
    <div className="container-fluid mt-3">
      <h3 className="col-sm-12 mb-4">Batch Upload</h3>

      <div className="mapped-data-table">
        {mappedCSVData.length > 2 && (
          <table>
            <thead>
              <tr>
                <th></th>
                {mappedCSVData[0].map((headerName, i) => (
                  <th key={i}>{headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mappedCSVData.slice(1).map((row, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {row.map((col, i) => (
                      <td key={i}>{col}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-3">
        <button className="button small-button fill-button mr-2" onClick={openModal}>
          CONTINUE
        </button>
      </div>

      <div className="mt-5">
        <button
          className="no-border-button"
          onClick={handleBack}
          disabled={loading}
        >
          <i className="fa fa-angle-left mr-2" aria-hidden="true" />
          Back
        </button>
      </div>

      <ReactModal
        isOpen={isOpenModal}
        onRequestClose={() => closeModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            position: "relative",
            minWidth: "600px",
          },
        }}
      >
        <div className="text-right">
          <i
            className="fa fa-close"
            style={{ width: "32px", height: "32px" }}
            onClick={closeModal}
          />
        </div>
        <div className="">
          <p>File: {chosenFile.name}</p>
          <p>Record Count: {selectedCSVData.length - 1}</p>
          <p>
            Estimate: $
            {subscription.plan === "premium"
              ? Number(0.05 * (selectedCSVData.length - 1) * 1.0625).toFixed(2)
              : Number(0.08 * (selectedCSVData.length - 1) * 1.0625).toFixed(2)}
          </p>
          <p className="d-flex">
            Suppress Against Database:&nbsp;&nbsp;
            <ToggleButton
              inactiveLabel={"No"}
              activeLabel={"Yes"}
              value={isSuppress}
              onToggle={(value) => setIsSuppress(!value)}
            />
          </p>
          {!isSuppress && (
            <div class="alert alert-warning" style={{ maxWidth: "600px" }}>
              Note: You can turn off "Suppress Against Database" to get up to
              date data and not check against what is already in your database.
              This may result in increase charges.
            </div>
          )}
          <button
            className="small-button fill-button mr-2"
            onClick={handleProceed}
          >
            Procced
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default MappedCSVDataTable;
