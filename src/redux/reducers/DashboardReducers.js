import cloneDeep from "lodash/cloneDeep";

const navbar_default_state = {
    expanded: false,
    groups: ["abc", "123"] // array of group ids
};

const login_default_state = {
    error: null,
};

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
    switch (action.type) {
        case "LOGIN":
            console.log(action);
            if (!action.error) {
                newState = { ...state, error: null};
            } else {
                newState = {...state, error: action.error}
            }
            break;
        default:
            break;
    }
    return newState;
};
