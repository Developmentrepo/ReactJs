import actions from "./actions";

const initialState = {
    lists: [],
    loading: false,
};

export default function listsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
