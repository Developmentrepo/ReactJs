import { all, call, put, takeEvery } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import actions from "./actions";
import TagsService from "../../services/tags";
import { history } from "../../index";
import UtilService from "../../services/utils";

export function* CREATE_TAG({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(TagsService.create, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    tags: resp.data,
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

export function* UPDATE_TAG({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(TagsService.update, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    tags: resp.data,
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

export function* DELETE_TAG({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(TagsService.delete, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            NotificationManager.success(resp.message, "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    tags: resp.data,
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

export function* GET_TAGS({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });
    const response = yield call(TagsService.list, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);
        if (resp && resp.success) {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    loading: false,
                    tags: resp.data,
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
        takeEvery(actions.CREATE_TAG, CREATE_TAG),
        takeEvery(actions.UPDATE_TAG, UPDATE_TAG),
        takeEvery(actions.DELETE_TAG, DELETE_TAG),
        takeEvery(actions.GET_TAGS, GET_TAGS),
    ]);
}
