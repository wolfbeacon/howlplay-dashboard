/*eslint no-useless-escape: "off"*/

import React from "react";
import {bindActionCreators} from "redux";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import {connect} from "react-redux";
import ModalQuestionItem from './ModalQuestionItem';
import {setFormApi, toggleModal} from "../../redux/actions/ModalActions";
import {Form, NestedField, Text} from "react-form";
import _ from 'lodash';
import {createQuiz, updateQuiz} from "../../redux/actions/QuizActions";

const validURL = value => {
    const pattern =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return (!pattern.test(value) || validateNotEmpty(value)) ? "Invalid URL" : null;
};

export const validateNotEmpty = value => {
    return (!value || value.trim() === '') ? "Field can't be empty" : null;
};

export const validateNotEmptyAsync = value =>
    new Promise((resolve, reject) =>
        {
            if (validateNotEmpty(value)) {
                reject("Field can't be empty");
            } else {
                resolve();
            }
        });

const validateURLAsync = value =>
    new Promise((resolve, reject) => {
       if (validURL(value))  {
           reject("Invalid URL");
       } else {
           resolve();
       }
    });

const showError = (name, formAPI) => {
    if (_.get(formAPI.touched, name) && _.get(formAPI.validationFailed, name)) {
        return "form-error";
    }
    return "";
};

const submitForm = (edit, submittedValues, toggleModal, createQuiz, updateQuiz) => {
    console.log(submittedValues);
    if (edit) {
        updateQuiz(submittedValues);
    } else {
        createQuiz(submittedValues);
    }
    toggleModal();
};

const DashboardModal = ({edit, setFormApi, expanded, toggleModal, createQuiz, updateQuiz}) =>
    <Form getApi={setFormApi} onSubmit={submittedValues => submitForm(edit, submittedValues, toggleModal, createQuiz, updateQuiz)}>
        {formApi => (
                <form id="dashboard-modal" onSubmit={formApi.submitForm} style={{display: `${(expanded) ? "flex" : "none"}`}}>
                    <div id="dashboard-modal-box" className="modal-default">
                        <div className="dashboard-modal-header">
                            <h3 className="dashboard-modal-title">{(edit)? "Edit": "New"} Quiz</h3>
                            <FontAwesomeIcon onClick={() => toggleModal()} id={"dashboard-modal-close"} icon={faTimes} size="lg"/>
                        </div>
                        <div className={"dashboard-modal-content"}>
                            <h2 className={"modal-content-headers"}>Quiz Information</h2>
                            <div className={'dashboard-modal-meta'}>
                                <Text className={showError("name", formApi)} field="name" placeholder="Name of Quiz" validate={validateNotEmpty} asyncValidate={validateNotEmptyAsync}/>
                                <Text className={showError("url", formApi)} field="url" placeholder="Game-Server URL" validate={validURL} asyncValidate={validateURLAsync}/>
                                {/*<select id={"modal-input-hackathon"}>*/}
                                    {/*<option value='' selected disabled>Select a Hackathon</option>*/}
                                {/*</select>*/}
                            </div>

                            <h2 className="modal-content-headers">Quiz Questions</h2>
                            <div className="dashboard-modal-inputs">
                            {
                                !formApi.values.questions || formApi.values.questions.length === 0?
                                <h3 style={{margin: "8px 8px 0", color: "rgba(0,0,0,0.2)"}}>There appears to be no questions...</h3>:
                                formApi.values.questions.map((x,i) => <NestedField field={["questions", i]} key={i}>
                                    <ModalQuestionItem formApi={formApi} index={i}/>
                                </NestedField>)
                            }
                            </div>
                            <button type="button" className="modal-content-add" onClick={() => formApi.addValue("questions", {})}>Add Question</button>
                            <button type="submit" id="modal-content-submit">Submit</button>
                        </div>
                    </div>
                    <div id={"dashboard-modal-backdrop"} className={"modal-default"}/>
                </form>
            )
        }
    </Form>;

const mapStateToProps = (state) => ({
    expanded: state.modal.expanded,
    edit: state.modal.edit,
    defaultValues: state.modal.defaultValues
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleModal,
    createQuiz,
    updateQuiz,
    setFormApi
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardModal);
