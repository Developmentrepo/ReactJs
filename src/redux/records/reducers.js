import actions from "./actions";

const initialState = {
    records: [],
    total_counts: 0,
    loading: false,
};

export default function recordsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
