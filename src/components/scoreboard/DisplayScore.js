import React from 'react';
import TopTenBoard from './TopTen.js'
import ScoreBoardSocketApi from '../../lib/socket.js'
import util from '../../lib/util';

// url is temporary, change it to the appropiate websocket link later
const url = "ws://localhost:9090";
// const answers = [0, 2, 1, 2, 1];
// const api = new ScoreBoardSocketApi(url);
let api = null;

// const server = "jdbc:postgresql://howlplay-db.czfcpgzgc9ja.us-west-2.rds.amazonaws.com:5432/howlplay";
var users = [];
var answers = [];
// var len = 0;

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
    api = new ScoreBoardSocketApi(url);
    
    fetch('http://localhost:8080/quiz/14')
      .then(function(res) {
        return res.json();
      }).then(function(data) {
        answers = data.questions.map(x => parseInt(x.answer, 10));
      });
  }

  componentWillMount() {
    api.socket.onopen = () => {
      console.log("Opening socket");
      api.socket.sendCode(14);
    }

    api.socket.onmessage = (e) => {
      var code = getCode(e.data);
      if (code === 14) {
        var data = new Uint8Array(e.data);
        users = JSON.parse(util.arrayBufferToString(data.slice(1))).slice(0, 10);
        console.log(users);
        users.map((user) => {
          user.score = 0;
          return user.answers.map((answer, index) => {
            return user.score += answer === answers[index]? 1000: 0;
          });
        });

        users.sort((a, b) => { return b.score - a.score; });
        this.setState({players: users});
        console.log(this.state);
        // this.setState({players: ["Test", "Test1"]});
      }
    }

    setInterval(() => { api.socket.sendCode(14); }, 1000);
    setInterval(() => { api.socket.sendCode(0); }, 2000);
  }

  componentWillUnmount() {
    api.socket.close();
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
          <div>Current users
            <div>{this.state.players.map((player) => {
              return <h4>{player.nickname}</h4>
            })}
            </div>
          </div>
          <button id="btn-stop-game">End Game</button>
        </div>
      </div>
    </div>
      // <div className="display-score-screen">
      //   <TopTenBoard users={users} serverlink={server} />
      //   <CountdownTimer />
      //   <div className="active-users">Active Users: 99999</div>
      //   <div id="player-list">Current Players
      //     <div>{this.state.players}</div>
      //   </div>
      //   <StopGameButton />
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
