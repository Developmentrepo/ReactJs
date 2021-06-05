import actions from "./actions";

const initialState = {
    assistants: [],
    loading: false,
};

export default function assistantReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
