import { all, call, put, takeEvery } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";

import actions from "./actions";
import SearchService from "../../services/search";
import UtilService from "../../services/utils";
import { history } from "../../index";

export function* SINGLE_SEARCH({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            results: null,
            loading: true,
        },
    });

    const response = yield call(SearchService.single_search, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success && resp.data) {
            NotificationManager.success("Searched successfully!", "Success");
            yield put({
                type: actions.SET_STATE,
                payload: {
                    results: resp.data.results,
                    credits: resp.data.credits,
                },
            });
        } else {
            NotificationManager.warning(
                resp ? resp.message : "No data available.",
                "Search"
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

export function* ADD_CREDIT({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(SearchService.add_credit, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success && resp.data) {
            NotificationManager.success(
                "Added your credits successfully!",
                "Success"
            );
            yield put({
                type: actions.SET_STATE,
                payload: {
                    credits: resp.data,
                },
            });

            history.replace("/search/single");
        } else {
            NotificationManager.warning(resp ? resp.message : "", "Failure");
        }
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* UPLOAD_LIST({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
            uploaded_file: null,
            uploaded_keys: [],
        },
    });

    const response = yield call(SearchService.upload_list, payload);

    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success) {
            // NotificationManager.success('File uploaded!', 'Success');
            yield put({
                type: actions.SET_STATE,
                payload: resp.data,
            });
        } else {
            NotificationManager.warning(resp ? resp.message : "", "Failure");
        }
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* BATCH_SEARCH({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
            success_upload: false,
        },
    });

    const response = yield call(SearchService.batch_search, payload);
    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success) {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    uploaded_file: null,
                    uploaded_keys: [],
                    success_upload: true,
                },
            });
        } else {
            NotificationManager.warning(resp ? resp.message : "", "Failure");
        }
    }
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: false,
        },
    });
}

export function* SUCCESS_UPLOAD({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            success_upload: false,
        },
    });
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.SINGLE_SEARCH, SINGLE_SEARCH),
        takeEvery(actions.ADD_CREDIT, ADD_CREDIT),
        takeEvery(actions.UPLOAD_LIST, UPLOAD_LIST),
        takeEvery(actions.BATCH_SEARCH, BATCH_SEARCH),
        takeEvery(actions.SUCCESS_UPLOAD, SUCCESS_UPLOAD),
    ]);
}
