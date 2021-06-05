import actions from "./actions";

const initialState = {
    files: [],
    loading: false,
};

export default function batchReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
