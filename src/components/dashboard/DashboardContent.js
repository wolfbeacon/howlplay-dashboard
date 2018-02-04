import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const DashboardContent = ({quizName, groupName}) =>
    <div id={"dashboard-content"}>
        <h1>{quizName}</h1>
        <h2>{groupName}</h2>
    </div>;

const mapStateToProps = (state) => {
    let activeQuiz = state.quiz.activeQuiz;
    return ({
        quizName: (activeQuiz) ? activeQuiz.name : "",
        groupName: (activeQuiz) ? state.quizGroups[activeQuiz.group].name : "",
    })
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardContent);