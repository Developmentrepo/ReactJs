import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Field, Form } from "react-final-form";
import "../../styles/form.style.scss";
import { history } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";
import Divider from "../../components/Divider/Divider";

const RegisterPage = () => {
    const _match = useRouteMatch("/register/:affiliate_code");
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [affiliate_code, setAffiliateCode] = useState();

    useEffect(
        () => {
            if (_match) {
                setAffiliateCode(_match.params.affiliate_code);
            }
        },
        [_match]
    );

    const onSubmit = async payload => {
        dispatch({
            type: "user/REGISTER",
            payload: payload
        });
    };

    return (
        <React.Fragment>
            <Container>
                <div className="flex flex-col items-center">
                    <div className="flex justify-center mt-10">
                        <img
                            src="resources/images/logo-vb.png"
                            alt="logo"
                            style={{ height: "50px" }}
                        />
                    </div>

                    <PageTitle title="REGISTER" />

                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form
                                className="flex flex-wrap justify-center xl:w-1/2 lg:w-2/3 md:w-2/3 sm:w-full w-full"
                                onSubmit={handleSubmit}
                            >
                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="first_name"
                                        component="input"
                                        placeholder="First Name *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="last_name"
                                        component="input"
                                        placeholder="Last Name *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="email"
                                        component="input"
                                        placeholder="Email *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="password"
                                        component="input"
                                        type="password"
                                        placeholder="Password *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="phone"
                                        component="input"
                                        placeholder="Phone Number *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="company_name"
                                        component="input"
                                        placeholder="Company Name *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="title"
                                        component="input"
                                        placeholder="Title *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="billing_address"
                                        component="input"
                                        placeholder="Billing Address *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="industry"
                                        component="input"
                                        placeholder="Industry *"
                                        required={true}
                                    />
                                </div>
                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="mailing_address"
                                        component="input"
                                        placeholder="Mailing Address *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full">
                                    <Field
                                        name="employee_number"
                                        component="input"
                                        placeholder="# of Employees *"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper w-full my-5">
                                    <button
                                        className="button large-button fill-button"
                                        type="submit"
                                        disabled={user.loading}
                                    >
                                        REGISTER
                                        <Loading
                                            type="spin"
                                            color="#ffffff"
                                            height={18}
                                            width={18}
                                        />
                                    </button>
                                </div>
                            </form>
                        )}
                    />

                    <div className="text-center mb-3">
                        <span className="text-lg pr-2">Have an account?</span>
                        <span
                            className="text-lg"
                            onClick={() => history.replace("/login")}
                        >
                            LOG IN
                        </span>
                    </div>
                </div>

                <div className="mt-10">
                    <Divider />
                    <div
                        className="text-center mt-6"
                        style={{ color: "#777777" }}
                    >
                        © Copyright 2021 Skip Force LLC. All Rights Reserved.
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default RegisterPage;
