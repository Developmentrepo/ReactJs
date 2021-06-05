import { all, call, put, takeEvery, select } from "redux-saga/effects";
import actions from "./actions";
import BatchSearchService from "../../services/batchsearch";
import UtilService from "../../services/utils";
import { NotificationManager } from "react-notifications";

export function* GET_FILES() {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(BatchSearchService.getFiles);
    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success && resp.data) {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    files: resp.data,
                },
            });
        } else {
            NotificationManager.warning(
                resp ? resp.message : "No File.",
                "Batch Search"
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

export function* GET_FILE({ payload }) {
    const response = yield call(BatchSearchService.getFile, payload);
    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success && resp.data) {
            const state = yield select();
            const files = state.batch.files;
            const index = files.findIndex((file) => file.id == resp.data.id);
            if (index > -1) {
                yield put({
                    type: actions.SET_STATE,
                    payload: {
                        files: [
                            ...files.slice(0, index),
                            resp.data,
                            ...files.slice(index + 1),
                        ],
                    },
                });
            }
        }
    }
}

export function* UPDATE_LIST({ payload }) {
    const response = yield call(BatchSearchService.updateFile, payload);
    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success) {
            yield put({
                type: actions.GET_FILES,
            });
            NotificationManager.success(resp.message, "Success");
        } else {
            NotificationManager.warning("Can't update list name!", "Failed");
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.GET_FILE, GET_FILE),
        takeEvery(actions.GET_FILES, GET_FILES),
        takeEvery(actions.UPDATE_LIST, UPDATE_LIST),
    ]);
}
