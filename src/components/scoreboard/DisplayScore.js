import React from 'react';
import TopTenBoard from './TopTen'

class DisplayScore extends React.Component {
  render() {
    return(
      <div className="display-score-screen">
        <div className="display-card">
          <TopTenBoard />
        </div>
        <div className="display-card">
          <h2 className="time-left">Time Left <span id="timer-time">0:10</span></h2>
          <h3 className="active-users">Active Users: <span id="users-count">99999</span></h3>
          <button id="btn-stop-game">End Game</button>
        </div>
      </div>

    );
  }
}

export default DisplayScore;
