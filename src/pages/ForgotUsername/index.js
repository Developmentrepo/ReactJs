import React from "react";
import { Field, Form } from "react-final-form";
import "../../styles/form.style.scss";
import { history } from "../../index";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";
import Divider from "../../components/Divider/Divider";

const ForgotUsername = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onSubmit = async (payload) => {
        dispatch({
            type: "user/FORGOT_USERNAME",
            payload: payload,
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

                    <PageTitle
                        title="Can't remember username?"
                        subtitle="No worries! Enter your email and we will send you a reset"
                    />

                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form
                                className="xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-full w-full"
                                onSubmit={handleSubmit}
                            >
                                <div className="input-wrapper">
                                    <Field
                                        name="email"
                                        component="input"
                                        type="email"
                                        placeholder="Email Address"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper my-5">
                                    <button
                                        className="button large-button fill-button"
                                        type="submit"
                                        disabled={user.loading}
                                    >
                                        SEND REQUEST
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
                        <span
                            className="p-2 text-lg cursor-pointer"
                            onClick={() => history.replace("/login")}
                        >
                            GO BACK
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

export default ForgotUsername;
