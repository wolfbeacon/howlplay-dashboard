import React, {Component} from 'react'

class QuestionAnswer extends Component {
  render() {
    return(
      <div className="answer">{this.props.text}</div>
    );
  }
}

export default QuestionAnswer;
