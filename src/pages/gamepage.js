import React, {Component} from 'react'
import Question from '../components/gamepage/question'

class GamePage extends Component {
  render() {
    return (
      <section id="gamepage">
        <div id="question-box">
          <Question />
          <p id="question-left"><span id="question-left-count">5</span> questions left</p>
        </div>
      </section>
    );
  }
}

export default GamePage;
