import actions from "./actions";

const initialState = {
    customer_profile_id: null,
    payment_profile_id: null,
    credit_card: null,
    subscription_id: null,
    subscription: null,
    loading: false
};

export default function authorizeNetReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
