import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

import ReactLoading from "react-loading";
import {
    Tab,
    Tabs,
    Button,
    Row,
    Col,
    ListGroup,
    Form,
    Alert,
} from "react-bootstrap";
import Modal from "react-awesome-modal";

import { DataTypeProvider } from "@devexpress/dx-react-grid";
import {
    EditingState,
    PagingState,
    IntegratedPaging,
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableColumnResizing,
    TableEditRow,
    TableEditColumn,
    PagingPanel,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import { FlatfileButton } from "@flatfile/react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Container from "../../components/Container/Container";

import BatchSearchService from "../../services/batchsearch";
import { config } from "../../config";

import "./styles.scss";

const getRowId = (row) => row.id;

const PriceFormatter = ({ value }) => <span>$ {value}</span>;

const PriceTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={PriceFormatter} {...props} />
);

const DownloadFormatter = ({ value }) =>
    value == "Not Paid" ? (
        <span>{value}</span>
    ) : (
        <>
            <a
                href={`${config.API_BASE_URL}/api/batchsearch/download.php?id=${value}`}
            >
                <i className="fa fa-download" aria-hidden="true" />
            </a>
            <span> Output Ready</span>
        </>
    );

const DownloadTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={DownloadFormatter} {...props} />
);

const BatchUpload1Page = () => {
    const [user, search, authorizenet] = useSelector((state) => [
        state.user,
        state.search,
        state.authorizenet,
    ]);

    const [columns] = useState([
        { name: "file", title: "File Name" },
        { name: "rows", title: "Properties" },
        { name: "duplicatings", title: "Duplicates" },
        { name: "hits", title: "Phone Appends" },
        { name: "email_hits", title: "Email Appends" },
        { name: "dnc_hits", title: "Blacklisted" },
        {
            name: "hits_percent",
            title: "Hits (%)",
            getCellValue: (row) =>
                `${Number((row.hits * 100) / row.rows).toFixed(2)} %`,
        },
        {
            name: "savings_cost",
            title: "Savings ($)",
        },
        { name: "cost", title: "Cost ($)" },
        {
            name: "status",
            title: "Download",
            getCellValue: (row) => (row.transaction_id ? row.id : "Not Paid"),
        },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: "file", width: 300 },
        { columnName: "rows", width: 100 },
        { columnName: "duplicatings", width: 100 },
        { columnName: "hits", width: 100 },
        { columnName: "email_hits", width: 100 },
        { columnName: "dnc_hits", width: 100 },
        {
            columnName: "hits_percent",
            width: 100,
        },
        {
            columnName: "savings_cost",
            width: 100,
        },
        { columnName: "cost", width: 100 },
        {
            columnName: "status",
            width: 200,
        },
    ]);

    const { files, loading } = useSelector((state) => state.batch);
    const { success_upload } = useSelector((state) => state.search);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({
                type: "batch/GET_FILES",
            });
        }, 5000);

        return () => {
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        if (success_upload && success_upload == true) {
            alert.success(
                "Your file is being processed. You will receive an Email/SMS when the file is ready for download."
            );
            dispatch({
                type: "search/SUCESS_UPLOAD",
            });
        }
    }, [success_upload]);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [alertShow, setAlertShow] = useState(false);

    const [batchData, setBatchData] = useState({
        batchId: "",
        fileName: "hello",
        recordCount: 0,
        estimate: "",
        isSupress: true,
    });

    function showTraceModal() {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="batch-trace-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div
                                    className="modal-title h4"
                                    id="contained-modal-title-vcenter"
                                >
                                    Batch Search Resources and Instructions
                                </div>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <b>NOTE</b>: We try our best to append
                                    Entity names and Trusts, but there is a low
                                    append hit rate. We highly recommend to
                                    search for the personal owner's name and
                                    address for higher append rate.
                                </p>
                                <Row>
                                    <Col>
                                        <a
                                            href="https://drive.google.com/file/d/1ZZ9g2dbytItcObzm8EAoapIIVwLrG3mm/view?usp=sharing"
                                            target="_blank"
                                            rel="Download template"
                                            className="download-template"
                                        >
                                            <i
                                                className="fa fa-download"
                                                aria-hidden="true"
                                            />
                                            DOWNLOAD SKIP TRACE TEMPLATE
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                            <div className="modal-footer">
                                <FlatfileButton
                                    className="batch-trace-btn"
                                    licenseKey="7c4feecc-eae9-4089-b4f8-f7e771b242d9"
                                    customer={{ userId: user.id }}
                                    settings={{
                                        title:
                                            "If the column headers are not included in the Skip Force template, please ignore. The output file results will not be effected.",
                                        type: "Contact",
                                        fields: [
                                            {
                                                label: "Full Name",
                                                key: "full_name",
                                            },
                                            {
                                                label: "Last Name",
                                                key: "last_name",
                                            },
                                            {
                                                label: "First Name",
                                                key: "first_name",
                                            },
                                            {
                                                label: "Mailing Address",
                                                key: "mailing_address",
                                            },
                                            {
                                                label: "Mailing City",
                                                key: "mailing_city",
                                            },
                                            {
                                                label: "Mailing State",
                                                key: "mailing_state",
                                            },
                                            {
                                                label: "Mailing Zip",
                                                key: "mailing_zip",
                                            },
                                            {
                                                label: "Property Address",
                                                key: "property_address",
                                            },
                                            {
                                                label: "Property City",
                                                key: "property_city",
                                            },
                                            {
                                                label: "Property State",
                                                key: "property_state",
                                            },
                                            {
                                                label: "Property Zip",
                                                key: "property_zip",
                                            },
                                            {
                                                label: "Phone 1",
                                                key: "phone_1",
                                            },
                                            {
                                                label: "Phone 2",
                                                key: "phone_2",
                                            },
                                            {
                                                label: "Phone 3",
                                                key: "phone_3",
                                            },
                                            {
                                                label: "Email 1",
                                                key: "email_1",
                                            },
                                            {
                                                label: "Email 2",
                                                key: "email_2",
                                            },
                                            {
                                                label: "Email 3",
                                                key: "email_3",
                                            },
                                        ],
                                        devMode: false,
                                        managed: true,
                                        allowInvalidSubmit: true,
                                        allowCustom: true,
                                    }}
                                    onData={async (results) => {
                                        let headers =
                                            results.$meta.headers_matched;
                                        let header_array = [];
                                        for (let _header of headers) {
                                            header_array.push(
                                                _header.matched_key
                                            );
                                        }
                                        for (let header of [
                                            "last_name",
                                            "first_name",
                                            "mailing_address",
                                            "mailing_city",
                                            "mailing_state",
                                            "mailing_zip",
                                            "property_address",
                                            "property_city",
                                            "property_state",
                                            "property_zip",
                                        ]) {
                                            let is_valid = header_array.includes(
                                                header
                                            );
                                            if (is_valid == false) {
                                                return (
                                                    "Failed, We required " +
                                                    header +
                                                    " header!"
                                                );
                                            }
                                        }
                                        onSubmit(results);
                                        setTimeout(() => {
                                            onClose();
                                        }, 2000);

                                        setConfirmModalVisible(true);
                                        // do something with the results
                                        return "Done!";
                                    }}
                                    onRecordInit={async (record) => {
                                        // const res = await axios.get(
                                        //     "https://us-street.api.smartystreets.com/street-address",
                                        //     {
                                        //         params: {
                                        //             key: "35972639850566656",
                                        //             candidates: "10",
                                        //             match: "invalid",
                                        //             street: record.mailing_address
                                        //                 ? record.mailing_address
                                        //                 : record.property_address,
                                        //             city: record.mailing_address
                                        //                 ? record.mailing_city
                                        //                 : record.property_city,
                                        //             state: record.mailing_address
                                        //                 ? record.mailing_state
                                        //                 : record.property_state,
                                        //             zipcode: record.mailing_address
                                        //                 ? record.mailing_zip
                                        //                 : record.property_zip,
                                        //         },
                                        //     }
                                        // );
                                        // let mailing_address = {
                                        //     value: record.mailing_address,
                                        // };
                                        // let property_address = {
                                        //     value: record.property_address,
                                        // };
                                        //
                                        // if (
                                        //     !["Y", "S", "D"].includes(
                                        //         res.data[0]["analysis"]["dpv_match_code"]
                                        //     )
                                        // ) {
                                        //     mailing_address = {
                                        //         value: record.mailing_address,
                                        //         info: [
                                        //             {
                                        //                 message:
                                        //                     "Invalid Address, please correct it!",
                                        //                 level: "error",
                                        //             },
                                        //         ],
                                        //     };
                                        //     property_address = {
                                        //         value: record.property_address,
                                        //         info: [
                                        //             {
                                        //                 message:
                                        //                     "Invalid Address, please correct it!",
                                        //                 level: "error",
                                        //             },
                                        //         ],
                                        //     };
                                        // }

                                        let last_name_msg = {
                                            value: record.last_name,
                                        };
                                        let first_name_msg = {
                                            value: record.first_name,
                                        };

                                        if (record.full_name) {
                                            if (
                                                !record.last_name ||
                                                !record.first_name
                                            ) {
                                                let last_name = record.full_name.split(
                                                    " "
                                                )[1];
                                                let first_name = record.full_name.split(
                                                    " "
                                                )[0];

                                                last_name_msg = {
                                                    value: last_name,
                                                    info: [
                                                        {
                                                            message:
                                                                "Populated last name from full name, Please confirm.",
                                                            level: "error",
                                                        },
                                                    ],
                                                };
                                                first_name_msg = {
                                                    value: first_name,
                                                    info: [
                                                        {
                                                            message:
                                                                "Populated first name from full name, Please confirm.",
                                                            level: "error",
                                                        },
                                                    ],
                                                };
                                            }
                                        }

                                        return {
                                            last_name: last_name_msg,
                                            first_name: first_name_msg,
                                            // mailing_address: mailing_address,
                                            // property_address: property_address,
                                        };
                                    }}
                                >
                                    LAUNCH UPLOADER
                                </FlatfileButton>
                            </div>
                        </div>
                    </div>
                );
            },
            closeOnClickOutside: true,
        });
    }

    function onChangeSuppress() {
        setBatchData({
            ...batchData,
            isSupress: !batchData.isSupress,
        });
    }

    function onSubmit(payload) {
        let price = 0.08;
        if (authorizenet.subscription.plan == "premium") {
            price = 0.05;
        }

        setBatchData({
            batchId: payload.batchId,
            fileName: payload.fileName,
            recordCount: payload.stats.acceptedRows,
            estimate: `$ ${
                (price + price * 0.0625) * payload.stats.acceptedRows
            }`,
            isSupress: true,
        });
    }

    function startSkipTrace() {
        if (authorizenet.subscription.plan != "new_premium") {
            confirmAlert({
                title: "ADD ON SERVICE",
                message:
                    'Click "YES", If you\'d like to scrub against the Litigation Firewall and the Federal DNC Registry for $0.005/record.',
                buttons: [
                    {
                        label: "YES",
                        onClick: () => {
                            setTimeout(() => {
                                confirmAlert({
                                    title: "ADD ON SERVICE",
                                    message:
                                        'Click "YES", If you\'d like to append Emails for $0.003/record.',
                                    buttons: [
                                        {
                                            label: "YES",
                                            onClick: () => {
                                                dispatch({
                                                    type: "search/BATCH_SEARCH",
                                                    payload: {
                                                        addOnService: true,
                                                        emailAppend: true,
                                                        data: batchData,
                                                    },
                                                });
                                            },
                                        },
                                        {
                                            label: "NO",
                                            onClick: () => {
                                                dispatch({
                                                    type: "search/BATCH_SEARCH",
                                                    payload: {
                                                        addOnService: true,
                                                        emailAppend: false,
                                                        data: batchData,
                                                    },
                                                });
                                            },
                                        },
                                    ],
                                    closeOnClickOutside: false,
                                });
                            }, 2000);
                        },
                    },
                    {
                        label: "NO",
                        onClick: () => {
                            setTimeout(() => {
                                confirmAlert({
                                    title: "ADD ON SERVICE",
                                    message:
                                        'Click "YES", If you\'d like to append Emails for $0.003/record.',
                                    buttons: [
                                        {
                                            label: "YES",
                                            onClick: () => {
                                                dispatch({
                                                    type: "search/BATCH_SEARCH",
                                                    payload: {
                                                        addOnService: false,
                                                        emailAppend: true,
                                                        data: batchData,
                                                    },
                                                });
                                            },
                                        },
                                        {
                                            label: "NO",
                                            onClick: () => {
                                                dispatch({
                                                    type: "search/BATCH_SEARCH",
                                                    payload: {
                                                        addOnService: false,
                                                        emailAppend: false,
                                                        data: batchData,
                                                    },
                                                });
                                            },
                                        },
                                    ],
                                    closeOnClickOutside: false,
                                });
                            }, 2000);
                        },
                    },
                ],
                closeOnClickOutside: false,
            });
        } else {
            confirmAlert({
                title: "ADD ON SERVICE",
                message:
                    'Click "YES", If you\'d like to append Emails for $0.003/record.',
                buttons: [
                    {
                        label: "YES",
                        onClick: () => {
                            dispatch({
                                type: "search/BATCH_SEARCH",
                                payload: {
                                    addOnService: true,
                                    emailAppend: true,
                                    data: batchData,
                                },
                            });
                        },
                    },
                    {
                        label: "NO",
                        onClick: () => {
                            dispatch({
                                type: "search/BATCH_SEARCH",
                                payload: {
                                    addOnService: true,
                                    emailAppend: false,
                                    data: batchData,
                                },
                            });
                        },
                    },
                ],
                closeOnClickOutside: false,
            });
        }
    }

    return (
        <React.Fragment>
            <Container>
                {alertShow ? (
                    <Alert
                        variant="success"
                        dismissible
                        onClose={() => setAlertShow(false)}
                    >
                        <Alert.Heading>Success!</Alert.Heading>
                        <p>
                            File uploaded successfully! Your file will be
                            processed in the background. Depending on the file
                            size. Your ourput file should available in a few
                            minutes to a few hours.
                        </p>
                    </Alert>
                ) : (
                    <></>
                )}

                <Modal
                    visible={confirmModalVisible}
                    effect="fadeInUp"
                    width="70%"
                >
                    <div className="batch-trace-modal batch-confirm-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div
                                    className="modal-title h4"
                                    id="contained-modal-title-vcenter"
                                >
                                    Confirm Skip Trace
                                </div>
                            </div>
                            <div className="modal-body">
                                <Row>
                                    <Col>
                                        <Alert variant={"warning"}>
                                            Note: You can turn off "Suppress
                                            Against Database" to get up to date
                                            data and not check against what is
                                            already in your database. This may
                                            result in increased charges.
                                        </Alert>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                File: {batchData.fileName}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Record Count:{" "}
                                                {batchData.recordCount}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Estimate: {batchData.estimate}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col sm={4}>
                                                        Supress Against
                                                        Database:
                                                    </Col>
                                                    <Col sm={8}>
                                                        <Form.Switch
                                                            type="switch"
                                                            id="supress-switch"
                                                            label="YES / NO"
                                                            checked={
                                                                batchData.isSupress
                                                            }
                                                            onChange={
                                                                onChangeSuppress
                                                            }
                                                        />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    className="batch-trace-btn"
                                    onClick={() => {
                                        setConfirmModalVisible(false);
                                        startSkipTrace();
                                    }}
                                >
                                    Start Skip Trace
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Row>
                    <Col>
                        <h1 className="page-title-batch">BATCH SEARCH</h1>
                        <Button
                            variant="primary"
                            className="batch-trace-btn"
                            onClick={showTraceModal}
                        >
                            UPLOAD YOUR LIST
                        </Button>
                    </Col>
                </Row>
                <Row className="batchListTable">
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                        <Tab eventKey="all" title="All">
                            <Grid
                                rows={files}
                                columns={columns}
                                getRowId={getRowId}
                            >
                                <PriceTypeProvider
                                    for={["cost", "savings_cost"]}
                                />
                                <DownloadTypeProvider for={["status"]} />
                                <PagingState
                                    defaultCurrentPage={0}
                                    pageSize={10}
                                />
                                <IntegratedPaging />
                                <Table />
                                <TableColumnResizing
                                    defaultColumnWidths={defaultColumnWidths}
                                />
                                <TableHeaderRow />
                                <PagingPanel />
                            </Grid>
                        </Tab>
                        <Tab eventKey="me" title="Owned By Me" />
                    </Tabs>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default BatchUpload1Page;
