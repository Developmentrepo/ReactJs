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
    InputGroup,
    Form,
    Alert,
} from "react-bootstrap";

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
    TableEditRow,
    TableEditColumn,
    PagingPanel,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import Modal from "react-awesome-modal";
import { FlatfileButton } from "@flatfile/react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Container from "../../components/Container/Container";

import BatchSearchService from "../../services/batchsearch";
import { config } from "../../config";
import { history } from "../../index";
import "./styles.scss";

const getRowId = (row) => row.id;

const RecordsFormatter = ({ value }) => <span>0 properties</span>;

const RecordsTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={RecordsFormatter} {...props} />
);

const Active = () => {
    const [columns] = useState([
        { name: "name", title: "List Name" },
        { name: "rows", title: "Properties" },
    ]);
    const [editingStateColumnExtensions] = useState([
        { columnName: "rows", editingEnabled: false },
    ]);

    const [user] = useSelector((state) => [state.user]);
    const { lists, loading } = useSelector((state) => state.lists);

    const dispatch = useDispatch();

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            added[0]["user_id"] = user.id;
            console.log(added[0]);
            dispatch({
                type: "lists/CREATE_LIST",
                payload: added[0],
            });
        }
        if (changed) {
            let changedId = Object.keys(changed)[0];

            dispatch({
                type: "lists/UPDATE_LIST",
                payload: {
                    user_id: user.id,
                    list_id: changedId,
                    name: changed[changedId]["name"],
                },
            });
        }
        if (deleted) {
            if (deleted[0].rows > 0) {
                confirmAlert({
                    title: "Are you sure you wanna delete this list?",
                    message:
                        "You cannot delete lists that have properties associated.",
                    buttons: [
                        {
                            label: "Okay",
                        },
                    ],
                    closeOnClickOutside: true,
                });
            }
            confirmAlert({
                title: "Are you sure you wanna delete this list?",
                message: "You won’t be able to undo this action.",
                buttons: [
                    {
                        label: "Nope",
                    },
                    {
                        label: "Yes, delete it!",
                        onClick: () => {
                            dispatch({
                                type: "lists/DELETE_LIST",
                                payload: {
                                    user_id: user.id,
                                    list_id: deleted[0],
                                },
                            });
                        },
                    },
                ],
                closeOnClickOutside: true,
            });
        }
    };

    useEffect(() => {
        dispatch({
            type: "lists/GET_LISTS",
            payload: {
                user_id: user.id,
            },
        });
    }, []);

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <h1 className="page-title-batch">Active Lists</h1>
                    </Col>
                </Row>
                <Row className="lists-table">
                    <Grid rows={lists} columns={columns} getRowId={getRowId}>
                        <RecordsTypeProvider for={["rows"]} />
                        <EditingState
                            onCommitChanges={commitChanges}
                            columnExtensions={editingStateColumnExtensions}
                        />
                        <PagingState defaultCurrentPage={0} pageSize={10} />
                        <IntegratedPaging />
                        <Table />
                        <TableHeaderRow />
                        <TableEditRow />
                        <TableEditColumn
                            showAddCommand
                            showEditCommand
                            showDeleteCommand
                        />
                        <PagingPanel />
                    </Grid>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Active;
