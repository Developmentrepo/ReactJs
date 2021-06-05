import { all, call, put, takeEvery } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import actions from "./actions";
import UserService from "../../services/user";
import { history } from "../../index";
import UtilService from "../../services/utils";

export function* LOAD_ASSISTANTS({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(UserService.loadAssistants, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    assistants: resp.data,
                },
            });
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");

            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                },
            });
        }
    }
}

export function* NEW_ASSISTANT({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.addNewAssistant, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");

            yield history.push("/assistants/list");
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

export function* DELETE_ASSISTANTS({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(UserService.deleteAssistant, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");

            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                },
            });

            yield put({
                type: "assistant/LOAD_ASSISTANTS",
                payload: {
                    owner_id: payload.user_id,
                },
            });
        } else {
            NotificationManager.error(resp ? resp.message : "", "Failure");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                },
            });
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.NEW_ASSISTANT, NEW_ASSISTANT),
        takeEvery(actions.LOAD_ASSISTANTS, LOAD_ASSISTANTS),
        takeEvery(actions.DELETE_ASSISTANTS, DELETE_ASSISTANTS),
    ]);
}
