import React from 'react';
import TopTenBoard from './TopTen.js'
import ScoreBoardSocketApi from '../../lib/socket.js'
import util from '../../lib/util';
import {store} from '../../index'
import {DEFAULT_QUIZ_TOKEN, DEFAULT_WEBSOCKET_URL, DEFAULT_API_URL} from "../../configurations";

// const answers = [0, 2, 1, 2, 1];
let getQuizUrlPrefix = DEFAULT_API_URL + '/quizzes/';
let api = null;
let users = [];
let answers = [];
let startTime = null;
let timer = null;

function getCode(buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class DisplayScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            ended: false,
            runtime: null
        };
        let self = this;
        this.endGame = this.endGame.bind(self);


        fetch(getQuizUrlPrefix + DEFAULT_QUIZ_TOKEN)
            .then(function (res) {
                console.log(res);
                return res.json();
            }).then(function (data) {
                let quiz = data[0];
                console.log(store.getState());
                api = new ScoreBoardSocketApi(DEFAULT_WEBSOCKET_URL);
                // api = new ScoreBoardSocketApi(store.getState().scoreboard.url);

                quiz.questions = JSON.parse(quiz.questions);
                answers = quiz.questions.map(x => parseInt(x.answer, 10));

                api.socket.onopen = () => {
                  api.socket.sendCode(15);
                  setInterval(() => { api.socket.sendCode(14) }, 1000);
                }

                api.socket.onmessage = (e) => {
                    let code = getCode(e.data);
                    switch(code) {
                      case 0:
                        api.socket.sendCode(0);
                        break;
                      case 14:
                        let data = new Uint8Array(e.data);
                        users = JSON.parse(util.arrayBufferToString(data.slice(1))).slice(0, 10);
                        users.map((user) => {
                            user.score = 0;
                            return user.answers.map((answer, index) => {
                                return user.score += answer === answers[index] ? 1000 : 0;
                            });
                        });

                        users.sort((a, b) => {
                            return b.score - a.score;
                        });
                        self.setState({players: users});
                        // this.setState({players: ["Test", "Test1"]});
                        break;
                      case 15:
                        console.log("HAMMER TIME");
                        startTime = new Date(util.arrayBufferToString(e.data.slice(1)));

                        // Assume people would have this run for longer than a month...
                        let now = new Date();
                        let d_diff = (now.getDate() - startTime.getDate()) * 86400;
                        let h_diff = (now.getHours() - startTime.getHours()) * 3600;
                        let m_diff = (now.getMinutes() - startTime.getMinutes()) * 60;
                        self.state.runtime = d_diff + h_diff + m_diff + (now.getSeconds() - startTime.getSeconds());

                        timer = setInterval(() => {
                          self.state.runtime += 1;
                        }, 1000);
                        break;
                      default:
                        console.log(code + " - NANI?!?!");
                        break;
                    }
                };
            }).catch(e => { console.log(e) });

    }

    componentWillUnmount() {
        if (api) { api.socket.close() }
    }

    endGame() {
      if (!this.state.ended) {
        window.clearInterval(timer);
        api.socket.sendCode(13);
        this.setState({ended: true});
      } else {
        window.history.back();
      }
    }

    render() {
        return (
            <div id="scoreboard">
                <div className="display-score-screen">
                    <div className="display-card">
                        <TopTenBoard users={users}/>
                    </div>
                    <div className="display-card">
                        <h2 className="time-left">Time Left: <span id="timer-time">
                          { this.state.runtime? (this.state.runtime - (this.state.runtime % 60)) / 60 + ":" + ("0" + this.state.runtime % 60).slice(-2) : "..." }
                        </span></h2>
                        <h3 className="active-users">Active Users: <span id="users-count">{users.length}</span></h3>
                        <div>Current users
                            <div>{this.state.players.map((player, key) => {
                                return <h4 key={key}>{player.nickname}</h4>
                            })}
                            </div>
                        </div>
                        <button id="btn-stop-game" onClick={this.endGame}>{ this.state.ended? "Exit" : "End Game"}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayScore;
