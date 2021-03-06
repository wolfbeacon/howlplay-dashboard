import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {toggleModal} from "../../redux/actions/ModalActions";
import {deleteQuiz} from "../../redux/actions/QuizActions";

const url = 'https://howlplay-dashboard.azurewebsites.net/spinup';
const DEFAULT_ADMIN_KEY = "HelloWorld";

function startQuiz(quiz_details, admin_key) {
  console.log(quiz_details);
  console.log(admin_key);
  let data = {details: quiz_details, key: admin_key};
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(data => {
    console.log("Done");
  })
}

const DashboardContentHeader = ({quiz, quizName, quizCode, groupName, toggleModal, deleteQuiz}) =>
    <div id={"dashboard-content-header"} style={{display: `${(quizCode) ? 'flex': 'none'}`}}>
        <div className={"dashboard-content-labels"}>
            <h1 className={"quiz-name"}>{quizName}</h1>
            <h3 className={"quiz-code"}>Code: {quizCode}</h3>
        </div>
        <div id="dashboard-content-controls">
            <button className={"quiz-button"} id={"start-quiz-button"} onClick={(e) => startQuiz(quizName, DEFAULT_ADMIN_KEY)}>Start</button>
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
    deleteQuiz
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardContentHeader);
