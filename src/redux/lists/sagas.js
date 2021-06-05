import { all, call, put, takeEvery } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import actions from "./actions";
import ListsService from "../../services/lists";
import { history } from "../../index";
import UtilService from "../../services/utils";

export function* CREATE_LIST({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(ListsService.create, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    lists: resp.data,
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

export function* UPDATE_LIST({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(ListsService.update, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    lists: resp.data,
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

export function* DELETE_LIST({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(ListsService.delete, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    lists: resp.data,
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

export function* GET_LISTS({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(ListsService.list, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    lists: resp.data,
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
        takeEvery(actions.CREATE_LIST, CREATE_LIST),
        takeEvery(actions.UPDATE_LIST, UPDATE_LIST),
        takeEvery(actions.DELETE_LIST, DELETE_LIST),
        takeEvery(actions.GET_LISTS, GET_LISTS),
    ]);
}
