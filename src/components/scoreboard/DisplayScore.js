import React from 'react';
import TopTenBoard from './TopTen';
import DisplayAnswer from './DisplayAnswer';
import ScoreBoardSocketApi from '../../lib/socket';
import util from '../../lib/util';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/fontawesome-free-solid';
import { DEFAULT_API_URL } from "../../configurations";

// const answers = [0, 2, 1, 2, 1];
let getQuizUrlPrefix = DEFAULT_API_URL + '/quiz/';
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
            curr: -1,
            runtime: null
        };
        let self = this;
        this.endGame = this.endGame.bind(self);
        this.nextDisplay = this.nextDisplay.bind(self);
        this.prevDisplay = this.prevDisplay.bind(self);

        fetch(getQuizUrlPrefix + this.props.id)
            .then(function (res) {
                return res.json();
            }).then(function (quiz) {
                // api = new ScoreBoardSocketApi(self.props.url);
                api = new ScoreBoardSocketApi("ws://localhost:9090");
                answers = quiz.questions.map(x => parseInt(x.answer, 10));
                self.setState({ curr: answers.length });
                console.log(answers);

                api.socket.onopen = () => {
                  api.socket.sendCode(12);
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
                        users = JSON.parse(util.arrayBufferToString(data.slice(1)));
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
                        break;
                      case 15:
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

    endGame(e) {
        e.preventDefault();
        if (!this.state.ended) {
            window.clearInterval(timer);
            api.socket.sendCode(13);
            api.socket.close();
            this.setState({ended: true});
        } else {
            this.props.history.goBack();
        }
    }

    nextDisplay() {
        let curr = this.state.curr;
        this.setState({curr: (curr++ === answers.length? 0: curr)});
    }

    prevDisplay() {
        let curr = this.state.curr;
        this.setState({curr: (curr-- === 0? answers.length: curr)});
    }

    render() {
        return (
            <div id="scoreboard">
                <div className="display-score-screen">
                    <div className="display-card">
                        <div className="display-card-header">
                            <h1 className="toptenboard-title">Top 10 Users</h1>
                            <div className="display-score-controls">
                                <FontAwesomeIcon onClick={this.prevDisplay} icon={ faAngleLeft } size="2x"/>
                                <FontAwesomeIcon onClick={this.nextDisplay} icon={ faAngleRight } size="2x"/>
                            </div>
                        </div>
                        {
                            this.state.curr === answers.length || this.state.curr < 0?
                            <TopTenBoard users={users.slice(0, 10)} />:
                            <DisplayAnswer users={users} index={this.state.curr} answer={answers[this.state.curr]}/>
                        }
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

const mapStateToProps = state => ({
    id: state.scoreboard.id,
    url: state.scoreboard.url
});

export default connect(mapStateToProps, null)(withRouter(DisplayScore));
