import cloneDeep from "lodash/cloneDeep";

const navbar_default_state = {
    expanded: false,
    groups: ["abc", "123"] // array of group ids
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
