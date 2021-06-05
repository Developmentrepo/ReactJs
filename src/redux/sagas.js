import { all } from "redux-saga/effects";
import user from "./user/sagas";
import assistant from "./assistant/sagas";
import authorizenet from "./authorize.net/sagas";
import search from "./search/sagas";
import batch from "./batch/sagas";
import records from "./records/sagas";
import lists from "./lists/sagas";
import tags from "./tags/sagas";

export default function* rootSaga() {
    yield all([
        user(),
        assistant(),
        authorizenet(),
        search(),
        batch(),
        records(),
        lists(),
        tags(),
    ]);
}
