import { combineReducers } from "redux";
import user from "./user/reducers";
import assistant from "./assistant/reducers";
import authorizenet from "./authorize.net/reducers";
import search from "./search/reducers";
import batch from "./batch/reducers";
import records from "./records/reducers";
import lists from "./lists/reducers";
import tags from "./tags/reducers";
import { connectRouter } from "connected-react-router";

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        user,
        assistant,
        authorizenet,
        search,
        batch,
        records,
        lists,
        tags,
    });
