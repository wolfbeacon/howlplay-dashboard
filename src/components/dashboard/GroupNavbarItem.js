import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import QuizNavbarItem from "./QuizNavbarItem";
import FolderIcon from "../../media/icons/folder-white.png"
import ExpandedIcon from "../../media/icons/arrow-down-white.png"
import CollapsedIcon from "../../media/icons/arrow-up-white.png"
import {groupHeaderClicked} from "../../redux/actions/QuizActions";


const GroupNavbarItem = ({name, quizzes, expanded, headerClick, id}) =>
    <div className={"group-navbar-item"}>
        <div className={"group-navbar-header"} onClick={headerClick}>
            <div className={"group-navbar-icon folder-icon"} style={{backgroundImage: `url(${FolderIcon})`}}/>
            <h3>{name}</h3>
            <div className={"group-navbar-icon group-dropdown-icon"} style={{backgroundImage: (expanded) ? `url(${CollapsedIcon})` : `url(${ExpandedIcon})`}}/>
        </div>
        <div style={{display: (expanded) ? "flex" : "none"}}>
            {quizzes.map(quizID => <QuizNavbarItem id={quizID} groupId = {id} key={quizID}/>)}
        </div>
    </div>;


const mapStateToProps = (state, ownProps) => ({
    expanded: state.quizGroups[ownProps.id].expanded,
    name: state.quizGroups[ownProps.id].name,
    quizzes: state.quizGroups[ownProps.id].quizzes
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    headerClick: () => groupHeaderClicked(ownProps.id)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroupNavbarItem);