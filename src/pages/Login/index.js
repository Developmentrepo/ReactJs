import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import "../../styles/form.style.scss";
import { history } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Container from "../../components/Container/Container";
import PageTitle from "../../components/Titles/PageTitle";
import Divider from "../../components/Divider/Divider";

const LoginPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onSubmit = async (payload) => {
        dispatch({
            type: "user/LOGIN_V2",
            payload: payload,
        });
    };

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let token = query.get("token");

    useEffect(() => {
        if (token) {
            dispatch({
                type: "user/VERIFY_TOKEN",
                payload: { token: token },
            });
        }
    }, [token]);

    // useEffect(() => {
    //     let query = useQuery();
    //     let token = query.get("token");
    //     if (token) {
    //         dispatch({
    //             type: "user/VERIFY_TOKEN",
    //             payload: { token: token },
    //         });
    //     }
    // }, []);

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

                    <PageTitle title="LOGIN" />

                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) => (
                            <form
                                className="xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-full w-full"
                                onSubmit={handleSubmit}
                            >
                                <div
                                    className="error-text input-wrapper"
                                    style={{ color: "red", fontWeight: 600 }}
                                >
                                    <span>{user.error}</span>
                                </div>
                                <div className="input-wrapper">
                                    <Field
                                        name="username"
                                        component="input"
                                        type="text"
                                        placeholder="Username or Email Address"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <Field
                                        name="password"
                                        component="input"
                                        type="password"
                                        placeholder="Password"
                                        required={true}
                                    />
                                </div>

                                <div className="input-wrapper my-5">
                                    <button
                                        className="button large-button fill-button"
                                        type="submit"
                                        disabled={user.loading}
                                    >
                                        LOG IN
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
                            onClick={() => history.push("/forgotusername")}
                        >
                            Can't remember username?
                        </span>
                        |
                        <span
                            className="p-2 text-lg cursor-pointer"
                            onClick={() => history.push("/forgotpassword")}
                        >
                            Lost your password?
                        </span>
                        |
                        <span
                            className="p-2 text-lg cursor-pointer"
                            onClick={() => history.push("/register")}
                        >
                            Register
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

export default LoginPage;
