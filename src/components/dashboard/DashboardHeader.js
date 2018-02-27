import React from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight'
import {toggleNavbar} from "../../redux/actions/DashboardActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import logo from '../../media/logo.svg';
import StyledTitle from "../StyledTitle";

const DashboardHeader = ({expanded, toggleNavbar}) => <div id={"dashboard-header"}>
    <div id="dashboard-header-style">
      <img src={logo} id="dashboard-logo" alt="logo" />
      <StyledTitle id={"dashboard-title"}/>
    </div>
    <div id="dashboard-header-body">
      <div id="dashboard-header-breadcrumb">
        <p>Home</p><FontAwesomeIcon icon={faAngleRight} size="lg"/>
      </div>
      <div id="dashboard-header-logout">
        <p>Logout</p><FontAwesomeIcon icon={faSignOutAlt} />
      </div>
    </div>
    { /*<div id={"dashboard-header-dropdown-button"} style={{backgroundImage: `url(${(expanded) ? CloseIcon : MenuIcon})`}} onClick={toggleNavbar}/>*/ }
</div>;

const mapStateToProps = (state) => ({
    expanded: state.dashboardNavbar.expanded
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleNavbar: toggleNavbar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (DashboardHeader);
