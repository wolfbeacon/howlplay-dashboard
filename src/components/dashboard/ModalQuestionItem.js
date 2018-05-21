import React, {Component} from "react";
import {Select, Text} from "react-form";

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

class ModalQuestionItem extends Component {
    render() {
        return (
            <div className={"modal-question-item"}>
                <h3>Question {this.props.index}</h3>
                <Text className={"modal-question-question"} placeholder="Question Name" field={"question-name"}/>

                <h4 className={"modal-question-subtitle"}>Options</h4>
                <div className="modal-question-options">
                    <Text field={["answers", 0]} placeholder="Choice 1"/>
                    <Text field={["answers", 1]} placeholder="Choice 2"/>
                </div>
                <div className="modal-question-options">
                    <Text field={["answers", 2]} placeholder="Choice 3"/>
                    <Text field={["answers", 3]} placeholder="Choice 4"/>
                </div>

                <h4 className={"modal-question-subtitle"}>Answer</h4>
                <Select options={Answers} field={"answer"} className={"modal-question-answer"}/>
            </div>);
    }
}

export default ModalQuestionItem;
