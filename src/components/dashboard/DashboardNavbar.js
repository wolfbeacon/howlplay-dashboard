import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GroupNavbarItem from "./GroupNavbarItem";
import {toggleNavbar} from "../../redux/actions/DashboardActions";

const DashboardNavbar = ({groups, expanded, toggleNavbar}) =>
<div id={"dashboard-navbar"} style={{display:`${(expanded) ? "flex" : "none"}`}} >
    <div id={"dashboard-navbar-items"}  style={{display: (expanded) ? "flex" : "none"}}>
        {groups.map(groupID => <GroupNavbarItem id={groupID} key={groupID}/>)}
    </div>
</div>;

const mapStateToProps = (state) => ({
    expanded: state.dashboardNavbar.expanded,
    groups: state.dashboardNavbar.groups,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleNavbar: () => toggleNavbar(false)
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardNavbar);