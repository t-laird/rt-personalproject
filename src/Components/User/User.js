import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import * as actions from '../../Actions/';
import './User.css';
import clearLocalStorage from '../../helpers/clearLocalStorage';
import { NavLink } from 'react-router-dom';
import getKeyFromLS from '../../helpers/getKeyFromLS';

class User extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
  	await this.loadUser();
  }

  loadUser = async () => {
  	try {
	    const user = await fetch('http://localhost:3000/api/v1/users', {
	      method: 'GET',
	      headers: {
	        "x-token": getKeyFromLS(),
	        "CONTENT-TYPE": 'application/json'
	      }
	    });
	    const userData = await user.json();

	    this.props.updateUser(userData[0]);

  	} catch (e) {
  		console.log('heeeeeeeyo')
    	window.location="https://tr-personal-proj.e1.loginrocket.com"
    	return
  	}
  }

  render() {
    return (
      <div className="user-component">
        <UserData />
        <UserProfile />
        <NavLink to='/joingroup' >Join / Switch Group</NavLink>
      </div>
    )
  }
}

const mapStateToProps = ( store ) => ({
  user: store.user
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => {
    dispatch(actions.updateUser(user))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);