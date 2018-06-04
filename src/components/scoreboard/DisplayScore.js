import React from 'react';
import TopTenBoard from './TopTen.js'
import ScoreBoardSocketApi from '../../lib/socket.js'
import util from '../../lib/util';
import {DEFAULT_QUIZ_TOKEN, DEFAULT_WEBSOCKET_URL, DEFAULT_API_URL} from "../../configurations";

// const answers = [0, 2, 1, 2, 1];
// const api = new ScoreBoardSocketApi(url);
let api = null;
let getQuizUrlPrefix = DEFAULT_API_URL + '/quizzes/';

let users = [];
let answers = [];
let startTime = null;

function getCode(buf) {
    let dataView = new Uint8Array(buf);
    return dataView[0];
}

class DisplayScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            runtime: null
        };
        let self = this;


        fetch(getQuizUrlPrefix + DEFAULT_QUIZ_TOKEN)
            .then(function (res) {
                console.log(res);
                return res.json();
            }).then(function (data) {
                let quiz = data[0];
                quiz.questions = JSON.parse(quiz.questions);
                answers = quiz.questions.map(x => parseInt(x.answer, 10));
                // let url = store.getState().scoreboard.url;
                let url = DEFAULT_WEBSOCKET_URL;
                api = new ScoreBoardSocketApi(url);

                api.socket.onopen = () => {
                    console.log("Opening socket");
                    api.socket.sendCode(15);
                    setInterval(() => { api.socket.sendCode(14) }, 1000);
                };

                api.socket.onmessage = (e) => {
                    let code = getCode(e.data);
                    switch(code) {
                      case 0:
                        api.socket.sendCode(0);
                        break;
                      case 14:
                        let data = new Uint8Array(e.data);
                        users = JSON.parse(util.arrayBufferToString(data.slice(1))).slice(0, 10);
                        console.log(users);
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

                        setInterval(() => {
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
                            <div>{this.state.players.map((player) => {
                                return <h4>{player.nickname}</h4>
                            })}
                            </div>
                        </div>
                        <button id="btn-stop-game">End Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayScore;
