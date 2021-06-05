import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import { Row, Col } from "react-bootstrap";

import Container from "../../components/Container/Container";

const ContactUsPage = () => {
    const dispatch = useDispatch();

    const onSubmit = async (payload) => {
        dispatch({
            type: "user/CONTACT_US",
            payload: {
                ...payload
            },
        });
    };

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col>
                        <h1 className="page-title-batch">Contact US</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="pt-2">
                            <Form
                                onSubmit={onSubmit}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap">
                                            <div className="input-wrapper md:w-full sm:w-full w-full">
                                                <Field
                                                    name="firstName"
                                                    component="input"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                            <div className="input-wrapper md:w-full sm:w-full w-full">
                                                <Field
                                                    name="lastName"
                                                    component="input"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                            <div className="input-wrapper md:w-full sm:w-full w-full">
                                                <Field
                                                    name="email"
                                                    component="input"
                                                    placeholder="Your Email Address"
                                                />
                                            </div>

                                            <div className="input-wrapper md:w-full sm:w-full w-full">
                                                <Field
                                                    name="message"
                                                    component="textarea"
                                                    placeholder="Message"
                                                    rows="5"
                                                />
                                            </div>

                                            <div className="input-wrapper md:w-1/2 sm:w-full w-full">
                                                <button
                                                    className="button submit-button fill-button mr-auto"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ContactUsPage;
