import React, { Component } from 'react';
import TopTenBoard from '../scoreboard/topten.js'
import CountdownTimer from '../timer/countdownTimer.js'
import StopGameButton from '../timer/stopGameButton.js'

class DisplayScore extends Component {
  render() {
    return(
      <div className="display-score-screen">
        <TopTenBoard />
        <CountdownTimer />
        <div className="active-users">Active Users: 99999</div>
        <StopGameButton />
      </div>

    );
  }
}

export default DisplayScore;
