import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import EditableLabel from "../EditableLabel";

const DashboardContentHeader = ({quizName, groupName}) =>
    <div id={"dashboard-content-header"} style={{display: `${(groupName) ? 'flex': 'none'}`}}>
        <div className={"dashboard-content-labels"}>
            <EditableLabel text={quizName} className={"edit-label"} labelClassName={"edit-label quiz-name-edit-label"}/>
            <EditableLabel text={groupName} className={"group-editable edit-label"} labelClassName={"edit-label group-name-edit-label"}/>
        </div>
        <div id="dashboard-content-controls">
            <button className={"quiz-button"} id={"start-quiz-button"}>Start</button>
            <button className={"quiz-button"} id={"delete-quiz-button"}>Delete</button>
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps) (DashboardContentHeader);
