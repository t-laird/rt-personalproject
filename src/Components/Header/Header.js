import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import * as actions from '../../Actions/index.js';
import clearLocalStorage from '../../helpers/clearLocalStorage';
import PropTypes from 'prop-types';

export const Header = (props) => {

  const logout = () => {
    props.logoutUser();
    clearLocalStorage();
  };

  let headerDisplay;

  if (!Object.keys(props.user).length) {
    headerDisplay = (<a 
      className="login" 
      href="https://tr-personal-proj.e1.loginrocket.com/"
    >LOGIN / SIGNUP</a>);
  } else {
    headerDisplay = (
      <div>
        <NavLink 
          className="user" 
          to='/snap-ninja/user'>
          {props.user.name}
          <img 
            src={require('./assets/user.svg')} 
            alt="user-icon" />
        </NavLink>
        <NavLink 
          className="group" 
          to='/snap-ninja/group'>{props.group.group_name} group
          <img 
            src={require('./assets/group.svg')} 
            alt="group icon" />
        </NavLink>
        <NavLink 
          className="logout" 
          to='/snap-ninja/' 
          onClick={logout} >LOGOUT</NavLink>
      </div>
    );
  }

  let displayTabs;

  if (Object.keys(props.user).length) {
    if (Object.keys(props.group).length) {
      displayTabs = (
        <div className="nav-tabs">
          <NavLink exact to="/snap-ninja/">HOME</NavLink>
          <NavLink to="/snap-ninja/user">USER</NavLink>
          <NavLink to="/snap-ninja/group">GROUP</NavLink>
          <NavLink to="/snap-ninja/send">SEND</NavLink>
          <NavLink to="/snap-ninja/account">ACCOUNT</NavLink>
        </div>
      );
    } else {
      displayTabs = (
        <div className="nav-tabs">
          <NavLink exact to="/snap-ninja/">HOME</NavLink>
          <NavLink to="/snap-ninja/creategroup">CREATE</NavLink>
          <NavLink to="/snap-ninja/joingroup">JOIN</NavLink>
        </div>
      );
    }
  }

  return (
    <div className="header-component">
      <NavLink 
        exact to='/snap-ninja/'>
        <h1>SNAP
          <img 
            className="header-logo" 
            src={require('./assets/ninja-logo.svg')} 
            alt="logo" />NINJA</h1>
      </NavLink>
      {headerDisplay}
      {displayTabs}
    </div>
  );
};


export const mapStateToProps = store => ({
  user: store.User,
  group: store.Group
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(actions.logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  logoutUser: PropTypes.func,
  user: PropTypes.object,
  group: PropTypes.object
};