import React from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import {toggleNavbar} from "../../redux/actions/DashboardActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import logo from '../../media/logo.svg';
import StyledTitle from "../StyledTitle";
import { DEFAULT_API_URL } from '../../configurations'

function logout() {
  fetch(DEFAULT_API_URL + '/dashboard/signout/', {
    credentials : 'include'
  }).then(resp => {
    window.location = '/';
  })
}

const DashboardHeader = ({expanded, toggleNavbar}) => <div id={"dashboard-header"}>
    <div id="dashboard-header-style">
      <img src={logo} id="dashboard-logo" alt="logo" />
      <StyledTitle id={"dashboard-title"}/>
    </div>
    <div id="dashboard-header-body">
      <div id="dashboard-header-menu" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faBars} size="sm"/><p>Menu</p>
      </div>
      <div id="dashboard-header-breadcrumb">
        <p>Home</p><FontAwesomeIcon icon={faAngleRight} size="lg"/>
      </div>
      <div id="dashboard-header-logout" onClick={logout}>
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
