import React, {Component} from 'react'
import Question from '../components/gamepage/question'

class GamePage extends Component {
  render() {
    return (
      <div id="gamepage">
        <Question />
        <div id="questions-left">5 questions left</div>
      </div>
    );
  }
}

export default GamePage;
