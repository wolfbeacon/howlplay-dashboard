import cloneDeep from "lodash/cloneDeep";
import * as Cookies from 'js-cookie';

const navbar_default_state = {
    expanded: false,
    groups: ["abc", "123"] // array of group ids
};

const login_default_state = {
    error: null,
    quizToken: Cookies.get('token')
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
            if (!action.error) {
                console.log(action);
                newState = { ...state, error: null, quizToken: Cookies.get('token') };
            } else {
                newState = {...state, error: action.error}
            }
            break;
        default:
            break;
    }
    return newState;
};
