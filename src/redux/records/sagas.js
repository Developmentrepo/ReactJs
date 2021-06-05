import { all, call, put, takeEvery, select } from "redux-saga/effects";
import actions from "./actions";
import RecordsService from "../../services/records";
import UtilService from "../../services/utils";
import { NotificationManager } from "react-notifications";

export function* GET_RECORDS({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
            loading: true,
        },
    });

    const response = yield call(RecordsService.getRecords, payload);
    if (response && response.data) {
        const resp = UtilService.parserResponse(response.data);

        if (resp.success && resp.data) {
            yield put({
                type: actions.SET_STATE,
                payload: {
                    records: resp.data,
                    total_counts: resp.total_count,
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

export default function* rootSaga() {
    yield all([takeEvery(actions.GET_RECORDS, GET_RECORDS)]);
}
