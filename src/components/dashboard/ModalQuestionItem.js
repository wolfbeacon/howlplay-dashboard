import React, {Component} from "react";

class ModalQuestionItem extends Component {
  render() {
    return (<div className={"modal-question-item"}>
      <h3>Question {this.props.index}</h3>
      <input id={"question-1"} type="text" placeholder="Question"/>
      <input id={"option-" + this.props.index + "-1"} type="text" placeholder="Choice 1"/>
      <input id={"option-" + this.props.index + "-2"} type="text" placeholder="Choice 2"/>
      <input id={"option-" + this.props.index + "-3"} type="text" placeholder="Choice 3"/>
      <input id={"option-" + this.props.index + "-4"} type="text" placeholder="Choice 4"/>
      <select id={"question-" + this.props.index + "-answer"}>
        <option value='' selected disabled>Select an Answer</option>
        <option value='1'>Choice 1</option>
        <option value='2'>Choice 2</option>
        <option value='3'>Choice 3</option>
        <option value='4'>Choice 4</option>
      </select>
    </div>);
  }
}

export default ModalQuestionItem;
