import React, { Component } from 'react';
import TopTenBoard from '../components/scoreboard/topten.js'
import CountdownTimer from '../components/timer/countdownTimer.js'
import StopGameButton from '../components/timer/stopGameButton.js'

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
