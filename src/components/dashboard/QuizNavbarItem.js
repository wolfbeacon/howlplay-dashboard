import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {quizClicked} from "../../redux/actions/QuizActions";

const QuizNavbarItem = ({name, clicked}) =>
    <div className={"quiz-navbar-item"} onClick={clicked}>
        <h4 className={"quiz-navbar-name"}>{name}</h4>
    </div>;


const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    clicked: () => quizClicked(ownProps.index, ownProps.id)
}, dispatch);


export default connect(null, mapDispatchToProps) (QuizNavbarItem);