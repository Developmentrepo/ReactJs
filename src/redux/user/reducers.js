import actions from "./actions";

const initialState = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    role: null,
    tour_checked: 0,
    created_at: null,
    authorized: false,
    loading: false,
    subscription_id: null,
    owner_id: null,
    error: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
