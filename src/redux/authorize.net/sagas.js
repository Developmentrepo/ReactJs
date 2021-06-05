import { all, call, put, takeEvery } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import actions from "./actions";
import AuthorizeNetService from "../../services/authorize.net";
import UtilService from "../../services/utils";
import { history } from "../../index";

export function* CREATE_CUSTOMER_PROFILE({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(
        AuthorizeNetService.createCustomerProfile,
        payload
    );

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            const {
                customer_profile_id,
                payment_profile_id,
                credit_card,
            } = resp.data;
            yield put({
                type: actions.SET_STATE,
                payload: {
                    customer_profile_id,
                    payment_profile_id,
                    credit_card,
                },
            });

            history.push("/");
        } else {
            NotificationManager.error(
                resp
                    ? resp.code
                        ? resp.code === "E00003"
                            ? "Invalid card number or expire date. Please input card number and expire date correctly."
                            : resp.message
                        : resp.message
                    : "",
                "Failure"
            );
        }
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* UPDATE_PAYMENT_PROFILE({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(
        AuthorizeNetService.updatePaymentProfile,
        payload
    );

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp && resp.success) {
            const { credit_card } = resp.data;
            yield put({
                type: actions.SET_STATE,
                payload: {
                    credit_card,
                },
            });

            NotificationManager.success(
                "Changed your credit card successfully!",
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

export function* CREATE_SUBSCRIPTION({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(
        AuthorizeNetService.createSubscription,
        payload
    );

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            const { subscription_id, subscription, search } = resp.data;
            yield put({
                type: actions.SET_STATE,
                payload: {
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
                type: "user/LOAD_CURRENT_ACCOUNT",
            });

            history.push("/");
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");

            if (
                resp &&
                resp.code &&
                (resp.code == 10001 || resp.code == 10002)
            ) {
                history.push("/creditcard/update");
            }
        }
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* UPDATE_SUBSCRIPTION({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(
        AuthorizeNetService.updateSubscription,
        payload
    );

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            const { subscription_id, subscription, search } = resp.data;
            yield put({
                type: actions.SET_STATE,
                payload: {
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

            NotificationManager.success(
                "Changed your subscription successfully!",
                "Success"
            );

            // history.push('/')
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

export function* CANCEL_SUBSCRIPTION({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(
        AuthorizeNetService.cancelSubscription,
        payload
    );

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            yield put({
                type: "user/LOGOUT",
            });
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

export default function* rootSaga() {
    yield all([
        takeEvery(actions.CREATE_CUSTOMER_PROFILE, CREATE_CUSTOMER_PROFILE),
        takeEvery(actions.UPDATE_PAYMENT_PROFILE, UPDATE_PAYMENT_PROFILE),
        takeEvery(actions.CREATE_SUBSCRIPTION, CREATE_SUBSCRIPTION),
        takeEvery(actions.UPDATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION),
        takeEvery(actions.CANCEL_SUBSCRIPTION, CANCEL_SUBSCRIPTION),
    ]);
}
