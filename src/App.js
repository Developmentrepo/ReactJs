import React, { Component } from "react";
import { NotificationContainer } from "react-notifications";
import { positions, Provider } from "react-alert";
import { Redirect, Route, Switch } from "react-router-dom";
// import AlertTemplate from "react-alert-template-basic";
import { withCookies } from "react-cookie";
import IdleTimer from "react-idle-timer";
import Joyride from "react-joyride";

import "react-notifications/lib/notifications.css";
import "./App.scss";
import { connect } from "react-redux";
import actions from "./redux/user/actions";

import Header from "./components/Header/Header";
import { history } from "./index";
import * as Tours from "./utils/tour.js";
import { config } from "./config";
import { routes } from "./routes";
import CustomRoute from "./routes/CustomRoute";
import Navbar from "./components/Navbar/Navbar";
import MainLayer from "./components/Layers/MainLayer";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeout: +config.TIMEOUT,
            steps: Tours.tours,
            token: localStorage.getItem("token")
        };

        this.idleTimer = null;
        this.onAction = this._onAction.bind(this);
        this.onIdle = this._onIdle.bind(this);
    }

    _onAction(e) {
        // console.log('user did something', e);
    }

    _onActive(e) {
        // console.log('user is active', e);
    }

    _onIdle(e) {
        // console.log('user is idle', e);
        this.idleTimer.reset();
        this.props.logout();
    }

    navigate = (router) => {
        history.push(router);
    };

    handleJoyrideCallback = (data) => {
        if (data.index === 3) {
            this.navigate("/search/batch");
        } else if (data.index === 6) {
            this.navigate("/account/setting");
        }
        if (data.action === "reset") {
            this.props.user.tour_checked = 1;
            this.props.checkedTours(this.props.user);
        }
        return;
    };

    render() {
        const options = {
            position: positions.TOP_RIGHT,
        };

        var BaseIcon = function BaseIcon(_ref) {
            var color = _ref.color,
                _ref$pushRight = _ref.pushRight,
                pushRight =
                    _ref$pushRight === undefined ? true : _ref$pushRight,
                children = _ref.children;
            return React.createElement(
                "svg",
                {
                    xmlns: "https://www.w3.org/2000/svg",
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: color,
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    style: {
                        marginRight: pushRight ? "20px" : "0",
                        minWidth: 24,
                    },
                },
                children
            );
        };

        var InfoIcon = function InfoIcon() {
            return React.createElement(
                BaseIcon,
                { color: "#2E9AFE" },
                React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
                React.createElement("line", {
                    x1: "12",
                    y1: "16",
                    x2: "12",
                    y2: "12",
                }),
                React.createElement("line", {
                    x1: "12",
                    y1: "8",
                    x2: "12",
                    y2: "8",
                })
            );
        };

        var SuccessIcon = function SuccessIcon() {
            return React.createElement("i", {
                className: "fa fa-check-square-o",
                "aria-hidden": "true",
                style: {
                    marginRight: "15px",
                },
            });
        };

        var ErrorIcon = function ErrorIcon() {
            return React.createElement(
                BaseIcon,
                { color: "#FF0040" },
                React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
                React.createElement("line", {
                    x1: "12",
                    y1: "8",
                    x2: "12",
                    y2: "12",
                }),
                React.createElement("line", {
                    x1: "12",
                    y1: "16",
                    x2: "12",
                    y2: "16",
                })
            );
        };

        var CloseIcon = function CloseIcon() {
            return React.createElement(
                BaseIcon,
                { color: "#FFFFFF", pushRight: false },
                React.createElement("line", {
                    x1: "18",
                    y1: "6",
                    x2: "6",
                    y2: "18",
                }),
                React.createElement("line", {
                    x1: "6",
                    y1: "6",
                    x2: "18",
                    y2: "18",
                })
            );
        };

        var _extends =
            Object.assign ||
            function (target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];

                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }

                return target;
            };

        var alertStyle = {
            backgroundColor: "#00C851",
            color: "white",
            padding: "10px",
            borderRadius: "3px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
            fontFamily: "Arial",
            width: "430px",
            boxSizing: "border-box",
        };

        var buttonStyle = {
            marginLeft: "20px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "#FFFFFF",
        };

        var AlertTemplate = function AlertTemplate(_ref) {
            console.log(_ref);
            var message = _ref.message,
                options = _ref.options,
                style = _ref.style,
                close = _ref.close;

            return React.createElement(
                "div",
                { style: _extends({}, alertStyle, style) },
                options.type === "info" && React.createElement(InfoIcon, null),
                options.type === "success" &&
                React.createElement(SuccessIcon, null),
                options.type === "error" &&
                React.createElement(ErrorIcon, null),
                React.createElement(
                    "div",
                    { style: {} },
                    React.createElement(
                        "p",
                        { style: {} },
                        "SUCCESSFUL FILE UPLOAD!"
                    ),
                    React.createElement("span", { style: { flex: 2 } }, message)
                ),
                React.createElement(
                    "button",
                    { onClick: close, style: buttonStyle },
                    React.createElement("i", {
                        className: "fa fa-times",
                        "aria-hidden": "true",
                    })
                )
            );
        };

        return (
            <React.Fragment>
                {
                    <Joyride
                        callback={this.handleJoyrideCallback}
                        showProgress={true}
                        hideBackButton={true}
                        continuous={true}
                        run={
                            this.props.user.tour_checked == 0 &&
                            (this.props.user.role == 1 ||
                                this.props.authorizenet.subscription_id)
                        }
                        showSkipButton={true}
                        styles={{
                            options: {
                                arrowColor: "#e3ffeb",
                                backgroundColor: "#e3ffeb",
                                overlayColor: "rgba(0, 0, 0, 0.7)",
                                primaryColor: "#b7921c",
                                textColor: "#a57a21",
                                width: "450px",
                            },
                        }}
                        steps={this.state.steps}
                    />
                }
                {this.props.user.authorized && (
                    <IdleTimer
                        ref={(ref) => {
                            this.idleTimer = ref;
                        }}
                        element={document}
                        onActive={this.onActive}
                        onIdle={this.onIdle}
                        onAction={this.onAction}
                        debounce={250}
                        timeout={this.state.timeout}
                    />
                )}
                <NotificationContainer />

                <Provider template={AlertTemplate} {...options}>
                    <div className="root flex">
                        {this.props.user.authorized &&
                            this.props.authorizenet.customer_profile_id &&
                            this.props.authorizenet.payment_profile_id &&
                            this.props.authorizenet.subscription_id && (
                                <Navbar />
                            )}
                        <MainLayer user={this.props.user}>
                            {this.state.token && <Header />}
                            <Switch>
                                <Route
                                    exact
                                    path={"/"}
                                    render={() => {
                                        return <Redirect to={"/dashboard"} />;
                                    }}
                                />
                                {routes.map((route) => (
                                    <CustomRoute
                                        path={route.path}
                                        component={route.component}
                                        key={route.path}
                                        exact={route.exact}
                                        required_auth={route.required_auth}
                                    />
                                ))}
                            </Switch>
                        </MainLayer>
                    </div>
                </Provider>
            </React.Fragment>
        );
    }
}

const mapStatesToProps = (state) => ({
    user: state.user,
    authorizenet: state.authorizenet,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () =>
        dispatch({
            type: actions.LOGOUT,
        }),
    checkedTours: (payload) =>
        dispatch({
            type: actions.CHECKED_TOURS,
            payload: payload,
        }),
});

App = connect(mapStatesToProps, mapDispatchToProps)(App);

export default withCookies(App);
