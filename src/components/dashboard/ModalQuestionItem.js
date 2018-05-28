import React, {Component} from "react";

class ModalQuestionItem extends Component {
  render() {
    let index = this.props.index + 1;
    return (<div className={"modal-question-item"}>
      <h3>Question {index}</h3>
      <input id={"question-1"} className={"modal-question-question"} type="text" placeholder="Question" value={this.props.data? this.props.data.title: ""}/>

      <h4 className={"modal-question-subtitle"}>Options</h4>
      {
        this.props.data?
          <div className="modal-question-options">
            {this.props.data.choices.map((item, k) => {
              return <input id={"option-" + index + "-" + k} type="text" value={item} placeholder={"Choice " + (k + 1)}/>
            })}
          </div>
        :
          <div className="modal-question-options">
            <input id={"option-" + index + "-0"} type="text" value="" placeholder="Choice 1"/>
            <input id={"option-" + index + "-1"} type="text" value="" placeholder="Choice 2"/>
            <input id={"option-" + index + "-2"} type="text" value="" placeholder="Choice 3"/>
            <input id={"option-" + index + "-3"} type="text" value="" placeholder="Choice 4"/>
          </div>
      }

      <h4 className={"modal-question-subtitle"}>Answer</h4>
      <select className={"modal-question-answer"} id={"question-" + index + "-answer"} value={this.props.data? this.props.data.answer: ""}>
        <option value='' selected disabled>Select an Answer</option>
        <option value='0'>Choice 1</option>
        <option value='1'>Choice 2</option>
        <option value='2'>Choice 3</option>
        <option value='3'>Choice 4</option>
      </select>
    </div>);
  }
}

export default ModalQuestionItem;
