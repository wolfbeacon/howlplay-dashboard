import React from 'react';
import TopTenBoard from './TopTen.js'
import ScoreBoardSocketApi from '../../lib/socket.js'
import util from '../../lib/util';
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getPlayers} from '../../redux/actions/ScoreboardActions'

// url is temporary, change it to the appropiate websocket link later
const url = "ws://localhost:9090";
const answers = [0, 2, 1, 2, 1];
const api = new ScoreBoardSocketApi(url);

const server = "jdbc:postgresql://howlplay-db.czfcpgzgc9ja.us-west-2.rds.amazonaws.com:5432/howlplay";
var users = [];
var len = 0;

function getCode (buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class DisplayScore extends React.Component {
  constructor(props) {
    super(props);
    api.socket.onopen = () => {
      api.socket.sendCode(14);
    }

    api.socket.onmessage = (e) => {
      var code = getCode(e.data);
      if (code == 14) {
        var data = new Uint8Array(e.data);
        users = JSON.parse(util.arrayBufferToString(data.slice(1)));
        console.log(users);
        // var userlist = document.querySelector('#player-list');
        // users.forEach((user) => {
        //   var entry = document.createElement('div');
        //   entry.innerHTML = user;
        //   userlist.appendChild(entry);
        // });
      }
    }

    setInterval(() => { api.socket.sendCode(14); }, 1000);
    setInterval(() => { api.socket.sendCode(0); }, 2000);
  }

  render() {
    // remove this later. Only meant for preventing Travis errors

    return(
      <div id="scoreboard">
        <div className="display-score-screen">
          <div className="display-card">
            <TopTenBoard users={users}/>
          </div>
          <div className="display-card">
            <h2 className="time-left">Time Left <span id="timer-time">0:10</span></h2>
            <h3 className="active-users">Active Users: <span id="users-count">{users.length}</span></h3>
            <button id="btn-stop-game">End Game</button>
          </div>
        </div>
      </div>
    );
  }
}

// export default DisplayScore;

const mapDispatchToProps = dispatch => bindActionCreators({getPlayers}, dispatch);

export default connect(null, mapDispatchToProps)(DisplayScore);
