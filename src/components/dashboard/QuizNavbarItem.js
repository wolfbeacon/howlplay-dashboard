import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {quizClicked} from "../../redux/actions/QuizActions";

const QuizNavbarItem = ({name, clicked}) =>
    <div className={"quiz-navbar-item"} onClick={clicked}>
        <h4 className={"quiz-navbar-name"}>{name}</h4>
    </div>;


const mapStateToProps = (state, ownProps) => ({
    name: state.quizzes.quizzes[ownProps.id].name,
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    clicked: () => quizClicked(ownProps.id)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (QuizNavbarItem);