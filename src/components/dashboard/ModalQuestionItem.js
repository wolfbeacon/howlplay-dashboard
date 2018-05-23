import React from "react";
import {Select, Text} from "react-form";
import _ from 'lodash';
import {validateNotEmptyAsync} from "./DashboardModal";

const showErrorQuizName = (questionIndex, formAPI) => {
    if (_.get(formAPI.touched, `questions[${questionIndex - 1}].question-name`)
        && _.get(formAPI.validationFailed, `questions[${questionIndex - 1}].question-name`)) {
        return "form-error";
    }
    return "";
};

const showErrorAnswers = (index, questionIndex, formAPI) => {
    if (_.get(formAPI.touched, `questions[${questionIndex - 1}].answers[${index}]`)
        && _.get(formAPI.validationFailed, `questions[${questionIndex - 1}].answers[${index}]`)) {
        return "form-error";
    }
    return "";
};

const Answers = [
    {
        label: 'Option One',
        value: 0,
    },
    {
        label: 'Option Two',
        value: 1,
    },
    {
        label: "Option Three",
        value: 2,
    },
    {
        label: "Option Four",
        value: 3,
    },
];

const ModalQuestionItem = ({index, formApi}) =>
    <div className={"modal-question-item"}>
        <h3>Question {index}</h3>
        <Text className={`modal-question-question ${showErrorQuizName(index, formApi)}`} placeholder="Question Name"
              field={"title"} asyncValidate={validateNotEmptyAsync}/>

        <h4 className={"modal-question-subtitle"}>Options</h4>
        <div className="modal-question-options">
            <Text field={["choices", 0]} className={showErrorAnswers(0, index, formApi)} placeholder="Choice 1"
                  asyncValidate={validateNotEmptyAsync}/>
            <Text field={["choices", 1]} className={showErrorAnswers(1, index, formApi)} placeholder="Choice 2"
                  asyncValidate={validateNotEmptyAsync}/>
        </div>
        <div className="modal-question-options">
            <Text field={["choices", 2]} className={showErrorAnswers(2, index, formApi)} placeholder="Choice 3"
                  asyncValidate={validateNotEmptyAsync}/>
            <Text field={["choices", 3]} className={showErrorAnswers(3, index, formApi)} placeholder="Choice 4"
                  asyncValidate={validateNotEmptyAsync}/>
        </div>

        <h4 className={"modal-question-subtitle"}>Answer</h4>
        <Select options={Answers} field={"answer"} className={"modal-question-answer"}/>
    </div>;

export default ModalQuestionItem;
