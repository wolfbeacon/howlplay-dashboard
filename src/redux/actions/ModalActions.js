export function toggleModal(edit=false, values=null) {
    console.log("Modal Toggled", values);
    return {
        type: 'TOGGLE_MODAL',
        payload: {values: values, edit: edit}
    }
}

export function setFormApi(formAPI) {
    console.log(formAPI);
    return {
        type: "SET_FORM_API",
        payload: {
            formAPI: formAPI
        }
    }
}