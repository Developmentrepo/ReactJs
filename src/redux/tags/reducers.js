import actions from "./actions";

const initialState = {
    tags: [],
    loading: false,
};

export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
