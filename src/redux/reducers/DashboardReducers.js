import cloneDeep from "lodash/cloneDeep";

const navbar_default_state = {
    expanded: false,
    groups: ["abc", "123"] // array of group ids
};

const login_default_state = {
    error: null,
    quizToken: ""
}

export const DashboardNavbarReducer = (state=navbar_default_state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case "TOGGLE_NAVBAR":
            newState.expanded = !state.expanded;
            break;
        default:
            break;
    }
    return newState;
};

export const DashboardReducer = (state=login_default_state, action) => {
    let newState = { ...state };
    switch (action.type){
        case "SET_QUIZ_TOKEN":
            newState = { ...state, error: null, quizToken: action.payload };
            break;
        case "BAD_QUIZ_TOKEN":
            newState = { ...state, error: "Your access key is invalid." };
            break;
        case "MISSING_QUIZ_TOKEN":
            newState = { ...state, error: "Please provide an access key." };
            break;
        default:
            break;
    }
    return newState;
};
