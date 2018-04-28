import React from 'react';
import TopTenBoard from './TopTen.js'
import CountdownTimer from '../timer/CountdownTimer.js'
import StopGameButton from '../timer/StopGameButton.js'

// url is temporary, change it to the appropiate websocket link later
const url = "ws://localhost:3000";
const socket = new WebSocket(url);

class DisplayScore extends React.Component {
  componentWillMount() {
    // This is just to prevent warnings with Travis. Replace/remove it whenever
    this.socket.onopen = () => {
      socket.send("Hello World");
    };
  }

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
