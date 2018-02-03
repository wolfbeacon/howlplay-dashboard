import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import GroupNavbarItem from "./GroupNavbarItem";

const DashboardNavbar = ({groups, expanded}) =>
<div id={"dashboard-navbar"} style={(expanded) ? {height: "100%"} : null}>
    <button id={"dashboard-navbar-dropdown-button"} style={{backgroundImage: (expanded) ? null : null}}/>
    <div id={"dashboard-navbar-items"}  style={{display: (expanded) ? "flex" : "none"}}>
        {groups.map(groupID => <GroupNavbarItem id={groupID} key={groupID}/>)}
    </div>
</div>;

const mapStateToProps = (state) => ({
    expanded: state.dashboardNavbar.expanded,
    groups: state.dashboardNavbar.groups,
});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps) (DashboardNavbar);