import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import QuizNavbarItem from "./QuizNavbarItem";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import ExpandedIcon from "@fortawesome/fontawesome-free-solid/faAngleUp";
import CollapsedIcon from "@fortawesome/fontawesome-free-solid/faAngleDown"
import {groupHeaderClicked} from "../../redux/actions/QuizActions";


const GroupNavbarItem = ({name, icon, quizzes, expanded, headerClick}) => {
    return <div className={"group-navbar-item"}>
        <div className={"group-navbar-header"} onClick={headerClick}>
            <div className={"group-navbar-icon hackathon-icon"} style={{backgroundImage: `url(${process.env.PUBLIC_URL + icon})`}}/>
            <h3 className={"group-navbar-title"}>{ name }</h3>
            <FontAwesomeIcon className={"group-navbar-icon group-dropdown-icon"} icon={expanded ? ExpandedIcon : CollapsedIcon} size="lg" />
        </div>
        <div className={"quizzes-group " + ((expanded) ? "quizzes-group quizzes-group-expanded" : "quizzes-group quizzes-group-collapsed")}>
            {
                quizzes ? quizzes.map((quiz, key) => {
                    return <QuizNavbarItem name={quiz.name} index={key} id={quiz.id} key={key}/>
                }) :
                null
            }
        </div>
    </div>
};


const mapStateToProps = (state, ownProps) => ({
    expanded: state.quizGroups[ownProps.id].expanded,
    name: state.quizGroups[ownProps.id].name,
    icon: state.quizGroups[ownProps.id].icon,
    quizzes: state.quiz.quizzes
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    headerClick: () => groupHeaderClicked(ownProps.id)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroupNavbarItem);
