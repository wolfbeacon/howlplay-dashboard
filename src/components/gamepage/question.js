import React, {Component} from 'react'

class Question extends Component {
  render() {
    return(
      <div id="question-area">
        <h1 id="question-title">Should Computer scientists be able to communicate via stale internet memes?</h1>
        <div id="question-options">
          <button className="question-answer" id="a">Yes</button>
          <button className="question-answer" id="b">No</button>
          <button className="question-answer" id="c">I dont know</button>
          <button className="question-answer" id="d">I like memes xd</button>
        </div>
      </div>
    );
  }
}

export default Question;
