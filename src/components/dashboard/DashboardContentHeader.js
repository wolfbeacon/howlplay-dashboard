import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { withRouter } from "react-router";
import {toggleModal} from "../../redux/actions/ModalActions";
import {deleteQuiz} from "../../redux/actions/QuizActions";
import { setUrl } from '../../redux/actions/ScoreboardActions';
import { DEFAULT_API_URL, DEFAULT_WEBSOCKET_URL } from '../../configurations';

// const url = 'https://howlplay-dashboard.azurewebsites.net/spinup';
const url = DEFAULT_API_URL + '/quizzes/codes/';
// const DEFAULT_ADMIN_KEY = "HelloWorld";

function startQuiz(quizCode, setUrl, history) {
    /* console.log(quiz_details);
    console.log(admin_key);
    let data = {details: quiz_details, key: admin_key};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(data => {
        console.log(data);
    }) */
    fetch(url + quizCode)
    .then(data => data.json())
    .then(json => {
        if (json.url && (json.url.startsWith("ws://") || json.url.startsWith("wss://"))) {
            setUrl(json);
        } else {
            console.log(`INVALID URL: Redirecting to '${DEFAULT_WEBSOCKET_URL}'`);
            setUrl({ ...json, url: DEFAULT_WEBSOCKET_URL });
        }
        history.push('/displayscore');
    }).catch( err => console.log("Error when joining game") );
}

const DashboardContentHeader = ({quiz, quizName, quizCode, toggleModal, deleteQuiz, setUrl,  history}) =>
    <div id={"dashboard-content-header"} style={{display: `${(quizCode) ? 'flex': 'none'}`}}>
        <div className={"dashboard-content-labels"}>
            <h1 className={"quiz-name"}>{quizName}</h1>
            <h3 className={"quiz-code"}>Code: {quizCode}</h3>
        </div>
        <div id="dashboard-content-controls">
            <button className={"quiz-button"} id={"start-quiz-button"} onClick={(e) => startQuiz(quizCode, setUrl, history)}>Start</button>
            <button className={"quiz-button"} id={"edit-quiz-button"} onClick={(e) => toggleModal(true, quiz)}>Edit</button>
            <button className={"quiz-button"} id={"delete-quiz-button"} onClick={(e) => deleteQuiz(quiz)}>Delete</button>
        </div>
    </div>;

const mapStateToProps = (state) => {
    let activeQuiz = state.quiz.activeQuiz;
    return ({
        quiz: activeQuiz,
        quizName: (activeQuiz) ? activeQuiz.name : null,
        quizCode: (activeQuiz) ? activeQuiz.code : null
    })
};

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleModal,
    deleteQuiz,
    setUrl
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(DashboardContentHeader));
