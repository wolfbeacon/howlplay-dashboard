import cloneDeep from "lodash/cloneDeep";

const modal_default_state = {
    expanded: false,
    edit: false
};

export const ModalReducer = (state=modal_default_state, action) => {
    let newState = cloneDeep(state);
    switch (action.type) {
        case "TOGGLE_MODAL":
            newState.expanded = !state.expanded;
            break;
        case "EDIT_MODAL":
            newState.edit = !state.edit;
            break;
        default:
            break;
    }
    return newState;
};
