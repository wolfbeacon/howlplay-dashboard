import React from 'react';
import TopTenBoard from './TopTen.js'
import CountdownTimer from '../timer/CountdownTimer.js'
import StopGameButton from '../timer/StopGameButton.js'
import ScoreBoardSocketApi from '../../lib/socket.js'
import util from '../../lib/util';

// url is temporary, change it to the appropiate websocket link later
const url = "ws://localhost:9090";
const api = new ScoreBoardSocketApi(url);

const server = "jdbc:postgresql://howlplay-db.czfcpgzgc9ja.us-west-2.rds.amazonaws.com:5432/howlplay";
var users = null;

function getCode (buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class DisplayScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
    api.socket.onopen = () => {
      api.socket.sendCode(14);
    }

    api.socket.onmessage = (e) => {
      console.log(e);
      var code = getCode(e.data);
      if (code === 14) {
        var data = new Uint8Array(e.data);
        users = JSON.parse(util.arrayBufferToString(data.slice(1)));
        this.setState({players: users});
        // this.setState({players: ["Test", "Test1"]});
      }

    }
  }

  render() {
    // remove this later. Only meant for preventing Travis errors
    return(
      <div className="display-score-screen">
        <TopTenBoard serverlink={server} />
        <CountdownTimer />
        <div className="active-users">Active Users: 99999</div>
        <div id="player-list">Current Players
          <div>{this.state.players}</div>
        </div>
        <StopGameButton />
      </div>

    );
  }
}

export default DisplayScore;
// const mapStateToProps = (state) => ({
//     players: state.scoreboard.players,
// });
//
// const mapDispatchToProps = dispatch => bindActionCreators({updatePlayers}, dispatch);
//
// export default connect(mapStateToProps, mapDispatchToProps)(DisplayScore);
