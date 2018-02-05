import React from "react";
import {toggleNavbar} from "../../redux/actions/DashboardActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CloseIcon from "../../media/icons/x-mark.png"
import MenuIcon from "../../media/icons/menu.png";

const DashboardHeader = ({expanded, toggleNavbar}) => <div id={"dashboard-header"}>
    <h1 id="dashboard-title">How I Play Dashboard</h1>
    <div id={"dashboard-header-dropdown-button"} style={{backgroundImage: `url(${(expanded) ? CloseIcon : MenuIcon})`}} onClick={toggleNavbar}/>
</div>;

const mapStateToProps = (state) => ({
    expanded: state.dashboardNavbar.expanded
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleNavbar: toggleNavbar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (DashboardHeader);