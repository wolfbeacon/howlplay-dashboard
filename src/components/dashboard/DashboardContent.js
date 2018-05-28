import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import DashboardContentHeader from "./DashboardContentHeader";

const DashboardContent = () =>
    <div id={"dashboard-content"}>
        <DashboardContentHeader/>
    </div>;

const mapStateToProps = (state) => {
    let activeQuiz = state.quiz.activeQuiz;
    return ({
        quizName: (activeQuiz) ? activeQuiz.name : "",
        groupName: "UserName",
    })
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardContent);