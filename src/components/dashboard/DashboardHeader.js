import React from "react";
import {toggleNavbar} from "../../redux/actions/DashboardActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CloseIcon from "../../media/icons/x-mark.png"
import MenuIcon from "../../media/icons/menu.png";
import logo from '../../media/logo.svg';
import StyledTitle from "../StyledTitle";

const DashboardHeader = ({expanded, toggleNavbar}) => <div id={"dashboard-header"}>
    <img src={logo} id="dashboard-logo" alt="logo" />
    <StyledTitle id={"dashboard-title"}/>
    <div id={"dashboard-header-dropdown-button"} style={{backgroundImage: `url(${(expanded) ? CloseIcon : MenuIcon})`}} onClick={toggleNavbar}/>
</div>;

const mapStateToProps = (state) => ({
    expanded: state.dashboardNavbar.expanded
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleNavbar: toggleNavbar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (DashboardHeader);