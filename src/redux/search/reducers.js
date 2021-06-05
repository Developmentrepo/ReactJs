import actions from "./actions";

const initialState = {
    credits: null,
    results: null,
    loading: false,
    success_upload: false,

    // additional states
    uploaded_file: null,
    uploaded_keys: [],
    template_keys: [
        "Last Name",
        "First Name",
        "Mailing Address",
        "Mailing City",
        "Mailing State",
        "Mailing Zip",
        "Property Address",
        "Property City",
        "Property State",
        "Property Zip",
        "Phone 1",
        "Phone 2",
        "Phone 3",
        "Email 1",
        "Email 2",
        "Email 3"
    ]
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
