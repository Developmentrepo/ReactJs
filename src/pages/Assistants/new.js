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
import "./styles.scss";

const NewAssistants = () => {
    const [user] = useSelector((state) => [state.user]);
    const dispatch = useDispatch();

    useEffect(() => {
        setAssistant({ ...assistant, owner_id: user.id });
    }, [user]);

    const [assistant, setAssistant] = useState({
        owner_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    function onSubmit() {
        dispatch({
            type: "assistant/NEW_ASSISTANT",
            payload: assistant,
        });
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <h1 className="page-title-batch">Add New Assistant</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form noValidate>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationFirstName"
                                >
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First name"
                                        defaultValue={assistant.first_name}
                                        onChange={(e) => {
                                            setAssistant({
                                                ...assistant,
                                                first_name: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationLastName"
                                >
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last name"
                                        defaultValue={assistant.last_name}
                                        onChange={(e) => {
                                            setAssistant({
                                                ...assistant,
                                                last_name: e.target.value,
                                            });
                                        }}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationUserName"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            required
                                            defaultValue={assistant.email}
                                            onChange={(e) => {
                                                setAssistant({
                                                    ...assistant,
                                                    email: e.target.value,
                                                });
                                            }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationPassword"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            required
                                            defaultValue={assistant.password}
                                            onChange={(e) => {
                                                setAssistant({
                                                    ...assistant,
                                                    password: e.target.value,
                                                });
                                            }}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Button
                                className="add-assistant-btn"
                                onClick={onSubmit}
                            >
                                Add
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default NewAssistants;
