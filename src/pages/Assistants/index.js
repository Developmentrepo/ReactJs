import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

import ReactLoading from "react-loading";
import {
    Tab,
    Tabs,
    Table,
    Button,
    Row,
    Col,
    ListGroup,
    InputGroup,
    Form,
    Alert,
} from "react-bootstrap";
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

const Assistants = () => {
    const { assistants } = useSelector((state) => state.assistant);
    const [user] = useSelector((state) => [state.user]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "assistant/LOAD_ASSISTANTS",
            payload: {
                owner_id: user.id,
            },
        });
    }, [user]);

    function deleteAssistant(id) {
        dispatch({
            type: "assistant/DELETE_ASSISTANTS",
            payload: {
                id: id,
                user_id: user.id,
            },
        });
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <h1 className="page-title-batch">Assistants</h1>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            className="batch-trace-btn"
                            onClick={() => history.push("/assistants/new")}
                        >
                            Add New Assistant
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Table className="assistant-table" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {assistants.map((assistant) => (
                                <tr key={assistant.id}>
                                    <td style={{ width: "20%" }}>
                                        <div>{assistant.first_name}</div>
                                    </td>
                                    <td style={{ width: "20%" }}>
                                        <div>{assistant.last_name}</div>
                                    </td>
                                    <td style={{ width: "50%" }}>
                                        <div>{assistant.email}</div>
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <div>
                                            <Button
                                                variant="danger"
                                                onClick={(e) =>
                                                    deleteAssistant(
                                                        assistant.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Assistants;
