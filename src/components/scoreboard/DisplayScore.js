import React from 'react';
import TopTenBoard from './TopTen.js'
import CountdownTimer from '../timer/CountdownTimer.js'
import StopGameButton from '../timer/StopGameButton.js'
import ScoreBoardSocketApi from '../../lib/socket.js'

// url is temporary, change it to the appropiate websocket link later
const url = "ws://localhost:3000";
const socket = new ScoreBoardSocketApi(url);

const server = "jdbc:postgresql://howlplay-db.czfcpgzgc9ja.us-west-2.rds.amazonaws.com:5432/howlplay";

class DisplayScore extends React.Component {
  render() {
    // remove this later. Only meant for preventing Travis errors
    socket.send('Prevent stupid warnings ggez');
    
    return(
      <div className="display-score-screen">
        <TopTenBoard serverlink={server} />
        <CountdownTimer />
        <div className="active-users">Active Users: 99999</div>
        <StopGameButton />
      </div>

    );
  }
}

export default DisplayScore;
