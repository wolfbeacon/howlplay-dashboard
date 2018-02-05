import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import EditableLabel from "../EditableLabel";
import EditIcon from "../../media/icons/edit.png";

const DashboardContentHeader = ({quizName, groupName}) =>
    <div id={"dashboard-content-header"} style={{display: `${(groupName) ? 'flex': 'none'}`}}>
        <div className={"dashboard-content-labels"}>
            <EditableLabel text={quizName} labelClassName={"edit-label quiz-name-edit-label"} editIcon={EditIcon}/>
            <EditableLabel text={groupName} className={"group-editable"} labelClassName={"edit-label group-name-edit-label"} editIcon={EditIcon}/>
        </div>
        <div id="dashboard-content-controls">
            <button id={"start-quiz-button"}>Start</button>
            <button id={"delete-quiz-button"}>Delete</button>
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