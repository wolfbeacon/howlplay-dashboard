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
    <div className="modal__question">
        <div className="modal__question__header">
            <h3 className="modal__question__title">Question {index + 1}</h3>
            <button type="button" className="modal__question__delete" onClick={() => formApi.removeValue("questions", index)}>Delete</button>
        </div>
        <Text className={`modal__question__question ${showErrorQuizName(index, formApi)}`} placeholder="What is the question?"
              field={"title"} asyncValidate={validateNotEmptyAsync}/>

        <h4 className={"modal__question__title--sub"}>Options</h4>
        <div className="modal__question__options">
            {
                Array(4).fill().map((value, key) => (
                    <Text
                        field={["choices", key]}
                        className={showErrorAnswers(0, index, formApi)}
                        placeholder={"Choice " + (key + 1)}
                        asyncValidate={validateNotEmptyAsync}
                        key={key}
                    />
                ))
            }
        </div>

        <h4 className={"modal__question__title--sub"}>Answer</h4>
        <Select options={Answers} field={"answer"} className={"modal__question__answer"}/>
    </div>;

export default ModalQuestionItem;
