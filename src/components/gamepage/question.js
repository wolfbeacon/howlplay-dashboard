import React, {Component} from 'react'
import QuestionAnswer from './questionAnswer'

class Question extends Component {
  render() {
    return(
      <div className="question-area">
        <div className="question-text">Should Computer scientists be able to communicate via stale internet memes?
          <QuestionAnswer text="Yes" />
          <QuestionAnswer text="No" />
          <QuestionAnswer text="I don't know" />
          <QuestionAnswer text="I like memes xd" />
        </div>
      </div>
    );
  }
}

export default Question;
