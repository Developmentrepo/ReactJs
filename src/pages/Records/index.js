import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
    Card,
} from "react-bootstrap";

import { DataTypeProvider } from "@devexpress/dx-react-grid";
import {
    EditingState,
    PagingState,
    CustomPaging,
    SearchState,
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableColumnResizing,
    Toolbar,
    SearchPanel,
    PagingPanel,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import Modal from "react-awesome-modal";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Container from "../../components/Container/Container";

import { config } from "../../config";

import "./styles.scss";

const getRowId = (row) => row.id;

const RecordsFormatter = ({ value }) => (
    <div>
        <p style={{ marginBottom: 0 }}>{value.split(",")[0]}</p>
        <span style={{ fontSize: 13, color: "grey" }}>
            {value.split(",")[1]}, {value.split(",")[2]}
        </span>
    </div>
);
const animatedComponents = makeAnimated();

const RecordsTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={RecordsFormatter} {...props} />
);

const RecordsPage = () => {
    const [user, search, authorizenet] = useSelector((state) => [
        state.user,
        state.search,
        state.authorizenet,
    ]);
    const [searchValue, setSearchState] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [recordsType, setRecordsType] = useState("clean");
    const { records, total_counts, loading } = useSelector(
        (state) => state.records
    );

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [availableFilters, setAvailableFilters] = useState([
        { value: "lists", label: "Lists" },
        { value: "tags", label: "Tags" },
        { value: "phone_tags", label: "Phone Tags" },
        { value: "property_county", label: "Property County" },
        { value: "owner_county", label: "Owner County" },
        { value: "property_zip_code", label: "Property ZIP Code" },
        { value: "owner_zip_code", label: "Owner ZIP Code" },
        { value: "property_status", label: "Property Status" },
        { value: "asignee", label: "Assignee" },
        { value: "list_stacking", label: "List Stacking" },
        { value: "last_updated", label: "Last Updated" },
    ]);

    const [defaultColumnWidths] = useState([
        { columnName: "owner", width: 120 },
        { columnName: "MailingAddress", width: 220 },
        { columnName: "PropertyAddress", width: 220 },
        { columnName: "Appended_Phone1", width: 120 },
        { columnName: "Appended_Email1", width: 300 },
    ]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "records/GET_RECORDS",
            payload: {
                user_id: user.id,
                page: 0,
                type: "clean",
            },
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: "records/GET_RECORDS",
            payload: {
                user_id: user.id,
                page: currentPage,
                type: recordsType,
            },
        });
    }, [currentPage, recordsType]);

    function getPageData(page) {
        setCurrentPage(page);
    }

    function changeRecordsType(type) {
        setRecordsType(type);
        setCurrentPage(0);
    }

    function closeFilterModal() {
        setFilterModalVisible(false);
    }

    function getFilterTypes() {
        return [
            { value: "include", label: "Include" },
            { value: "not_include", label: "Do Not Include" },
        ];
    }

    function onChangeFilters(newValue, actionMeta) {
        setSelectedFilters(newValue);
    }

    const [columns] = useState([
        {
            name: "owner",
            title: "Owner",
            getCellValue: (row) => row.FirstName + " " + row.LastName,
        },
        {
            name: "MailingAddress",
            title: "Mailing Address",
            getCellValue: (row) =>
                row.MailingAddress
                    ? row.MailingAddress +
                      "," +
                      row.MailingCity +
                      "," +
                      row.MailingZip
                    : "-",
        },
        {
            name: "PropertyAddress",
            title: "Property Address",
            getCellValue: (row) =>
                row.PropertyAddress
                    ? row.PropertyAddress +
                      "," +
                      row.PropertyCity +
                      "," +
                      row.PropertyZip
                    : "-",
        },
        {
            name: "Appended_Phone1",
            title: "Phone",
            getCellValue: (row) =>
                row.Appended_Phone1 ? row.Appended_Phone1 : "-",
        },
        {
            name: "Appended_Email1",
            title: "Email",
            getCellValue: (row) =>
                row.Appended_Email1 ? row.Appended_Email1 : "-",
        },
    ]);

    return (
        <React.Fragment>
            <Container>
                <Modal
                    visible={filterModalVisible}
                    onClickAway={() => closeFilterModal()}
                    effect="fadeInRight"
                    width="30%"
                    styles={{
                        height: "100%",
                        right: 0,
                        position: "fixed",
                        borderRadius: 0,
                    }}
                >
                    <div className="filter-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div
                                    className="modal-title h4"
                                    id="contained-modal-title-vcenter"
                                >
                                    Filter Records
                                </div>
                            </div>
                            <div className="modal-body">
                                <Row>
                                    <Col>
                                        You can build your very own filter set
                                        by adding filter blocks and applying
                                        conditions to it.
                                    </Col>
                                </Row>
                                {selectedFilters.map((filter) => (
                                    <Row key={filter.value}>
                                        <Col>
                                            <Card>
                                                <Card.Header>
                                                    {filter.label} - Filter
                                                    properties that:
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <Select
                                                                options={getFilterTypes()}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Form.Control
                                                                placeholder={`Search for ${filter.label}`}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                ))}
                                <Row>
                                    <Col>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            options={availableFilters}
                                            onChange={onChangeFilters}
                                            isMulti
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="modal-footer">
                                <Button className="filter-btn btn-block">
                                    Apply Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Row>
                    <Col>
                        <h1 className="page-title-batch">RECORDS</h1>
                    </Col>
                    <Col>
                        <Button
                            style={{ float: "right" }}
                            className="filter-btn"
                            onClick={(e) => setFilterModalVisible(true)}
                        >
                            Filter records
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Tabs
                        id="uncontrolled-tab-example"
                        activeKey={recordsType}
                        onSelect={(k) => changeRecordsType(k)}
                    >
                        <Tab eventKey="clean" title="Clean" className="records-tabs">
                            <Grid
                                rows={records}
                                columns={columns}
                                getRowId={getRowId}
                            >
                                <SearchState
                                    value={searchValue}
                                    onValueChange={setSearchState}
                                />
                                <RecordsTypeProvider
                                    for={["PropertyAddress", "MailingAddress"]}
                                />
                                <EditingState />
                                <PagingState
                                    currentPage={currentPage}
                                    pageSize={10}
                                    onCurrentPageChange={(page) =>
                                        getPageData(page)
                                    }
                                />
                                <CustomPaging totalCount={total_counts} />
                                <Table />
                                <TableColumnResizing
                                    defaultColumnWidths={defaultColumnWidths}
                                />
                                <TableHeaderRow />
                                <Toolbar />
                                <SearchPanel />
                                <PagingPanel />
                            </Grid>
                        </Tab>
                        <Tab eventKey="incomplete" title="Incomplete" className="records-tabs">
                            <Grid
                                rows={records}
                                columns={columns}
                                getRowId={getRowId}
                            >
                                <SearchState
                                    value={searchValue}
                                    onValueChange={setSearchState}
                                />
                                <RecordsTypeProvider
                                    for={["PropertyAddress", "MailingAddress"]}
                                />
                                <EditingState />
                                <PagingState
                                    currentPage={currentPage}
                                    pageSize={10}
                                    onCurrentPageChange={(page) =>
                                        getPageData(page)
                                    }
                                />
                                <CustomPaging totalCount={total_counts} />
                                <Table />
                                <TableColumnResizing
                                    defaultColumnWidths={defaultColumnWidths}
                                />
                                <TableHeaderRow />
                                <Toolbar />
                                <SearchPanel />
                                <PagingPanel />
                            </Grid>
                        </Tab>
                        <Tab eventKey="all" title="All" className="records-tabs">
                            <Grid
                                rows={records}
                                columns={columns}
                                getRowId={getRowId}
                            >
                                <SearchState
                                    value={searchValue}
                                    onValueChange={setSearchState}
                                />
                                <RecordsTypeProvider
                                    for={["PropertyAddress", "MailingAddress"]}
                                />
                                <EditingState />
                                <PagingState
                                    currentPage={currentPage}
                                    pageSize={10}
                                    onCurrentPageChange={(page) =>
                                        getPageData(page)
                                    }
                                />
                                <CustomPaging totalCount={total_counts} />
                                <Table />
                                <TableColumnResizing
                                    defaultColumnWidths={defaultColumnWidths}
                                />
                                <TableHeaderRow />
                                <Toolbar />
                                <SearchPanel />
                                <PagingPanel />
                            </Grid>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default RecordsPage;
