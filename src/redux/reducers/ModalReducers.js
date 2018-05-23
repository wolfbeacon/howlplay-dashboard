const modal_default_state = {
    expanded: false,
    edit: false,
    formApi: null
};

export const ModalReducer = (state=modal_default_state, action) => {
    let newState = {...state};
    switch (action.type) {
        case "TOGGLE_MODAL":
            newState.expanded = !state.expanded;
            newState.edit = action.payload.edit;
            if (action.payload.values) {
                newState.formApi.setAllValues(action.payload.values);
            }
            break;
        case "SET_FORM_API":
            console.log(action.payload);
            newState.formApi = action.payload.formAPI;
            break;
        default:
            break;
    }
    return newState;
};
