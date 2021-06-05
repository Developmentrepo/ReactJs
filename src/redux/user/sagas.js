import { all, call, put, takeEvery } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import actions from "./actions";
import UserService from "../../services/user";
import { history } from "../../index";
import UtilService from "../../services/utils";

var state = false;

export function* REGISTER({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(UserService.register, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");

            yield history.push("/login");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* LOGIN({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(UserService.login, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            yield put({
                type: actions.SET_STATE,
                payload: resp.data,
            });

            history.push("/verify/email");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* LOGIN_V2({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(UserService.login_v2, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            localStorage.setItem("token", resp.data.token);

            yield put({
                type: actions.LOAD_CURRENT_ACCOUNT,
            });

            if (state) yield history.push("/");
        } else {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    error: resp.message,
                },
            });
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* REQUEST_LOGIN_CODE({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.requestLoginCode, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(
                "Just sent the login code. Please check your email address",
                "Success"
            );
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* VERIFY_LOGIN_CODE({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.verifyLoginCode, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            localStorage.setItem("token", resp.data.token);

            yield put({
                type: actions.LOAD_CURRENT_ACCOUNT,
            });
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    } else {
        yield put({
            type: actions.SET_STATE,
            payload: {
                loading: false,
            },
        });
    }
}

export function* VERIFY_TOKEN({ payload }) {
    console.log(payload);
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.verifyToken, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp ? resp.message : "", "Success");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
        yield put({
            type: actions.SET_STATE,
            payload: {
                loading: false,
            },
        });
        history.push("/login");
    } else {
        yield put({
            type: actions.SET_STATE,
            payload: {
                loading: false,
            },
        });
    }
}

export function* RESET_PASSWORD({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.resetPassword, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(
                "Just sent new password. Please check your email address",
                "Success"
            );

            history.push("/login");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* CONTACT_US({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.contactUS, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(
                "We've sent your message to one of our agent. He/She will be get back to you asap.",
                "Success"
            );
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* FORGOT_USERNAME({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.forgotUsername, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(
                "Just sent your username. Please check your email address",
                "Success"
            );

            history.push("/login");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* UPDATE_EMAIL({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.updateEmail, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            const { email } = resp.data;

            yield put({
                type: actions.SET_STATE,
                payload: {
                    email,
                },
            });

            NotificationManager.success(
                "Updated your email address successfully!",
                "Success"
            );

            history.push("/account/setting");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* UPDATE_PASSWORD({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.updatePassword, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            console.log(resp);

            NotificationManager.success(
                "Updated your email address successfully!",
                "Success"
            );
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
        }
    }

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* LOGOUT() {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(UserService.logout);

    if (response && response.data) {
        yield localStorage.removeItem("token");
        yield put({
            type: actions.SET_STATE,
            payload: {
                id: null,
                first_name: null,
                last_name: null,
                email: null,
                phone: null,
                role: null,
                tour_checked: 0,
                created_at: null,
                authorized: false,
            },
        });

        yield put({
            type: "authorize.net/SET_STATE",
            payload: {
                customer_profile_id: null,
                payment_profile_id: null,
                credit_card: null,
                subscription_id: null,
                subscription: null,
            },
        });

        yield put({
            type: "search/SET_STATE",
            payload: {
                credits: null,
                results: null,
                uploaded_file: null,
                uploaded_keys: [],
            },
        });

        yield history.push("/login");
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* LOAD_CURRENT_ACCOUNT() {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(UserService.currentAccount);

    if (response && response.data && response.data.success) {
        const {
            id,
            first_name,
            last_name,
            email,
            phone,
            role,
            tour_checked,
            created_at,
            customer_profile_id,
            payment_profile_id,
            credit_card,
            subscription_id,
            owner_id,
            subscription,
            search,
            files,
        } = response.data.data;
        yield put({
            type: actions.SET_STATE,
            payload: {
                id,
                first_name,
                last_name,
                email,
                phone,
                role,
                tour_checked,
                created_at,
                subscription_id,
                owner_id,
                authorized: true,
            },
        });

        yield put({
            type: "authorize.net/SET_STATE",
            payload: {
                customer_profile_id,
                payment_profile_id,
                credit_card,
                subscription_id,
                subscription,
            },
        });

        yield put({
            type: "search/SET_STATE",
            payload: {
                credits: search,
            },
        });

        yield put({
            type: "batch/SET_STATE",
            payload: {
                files: files,
            },
        });
        state = true;
        // yield history.push("/");
    } else {
        yield put({
            type: actions.SET_STATE,
            payload: {
                id: null,
                first_name: null,
                last_name: null,
                email: null,
                phone: null,
                role: null,
                tour_checked: 0,
                created_at: null,
                authorized: false,
                subscription_id: null,
                owner_id: null,
            },
        });

        // yield history.push('/login');
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* CHECKED_TOURS({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    yield call(UserService.checkedTours, payload);

    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* CHECK_TOURS() {
    yield history.push("/search/single");
    yield put({
        type: actions.SET_STATE,
        payload: {
            tour_checked: 0,
        },
    });
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.REGISTER, REGISTER),
        takeEvery(actions.LOGIN, LOGIN),
        takeEvery(actions.LOGIN_V2, LOGIN_V2),
        takeEvery(actions.REQUEST_LOGIN_CODE, REQUEST_LOGIN_CODE),
        takeEvery(actions.VERIFY_TOKEN, VERIFY_TOKEN),
        takeEvery(actions.VERIFY_LOGIN_CODE, VERIFY_LOGIN_CODE),
        takeEvery(actions.RESET_PASSWORD, RESET_PASSWORD),
        takeEvery(actions.FORGOT_USERNAME, FORGOT_USERNAME),
        takeEvery(actions.UPDATE_EMAIL, UPDATE_EMAIL),
        takeEvery(actions.UPDATE_PASSWORD, UPDATE_PASSWORD),
        takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
        takeEvery(actions.LOGOUT, LOGOUT),
        takeEvery(actions.CHECKED_TOURS, CHECKED_TOURS),
        takeEvery(actions.CHECK_TOURS, CHECK_TOURS),
        takeEvery(actions.CONTACT_US, CONTACT_US),
        LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
    ]);
}
