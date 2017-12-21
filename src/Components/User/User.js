import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import * as actions from '../../Actions/';
import './User.css';

class User extends Component{
  constructor() {
    super();
  }
  componentDidMount() {
    this.checkForKey();    
  }

  async sendKey (key) {
    const loginResponse = await fetch('http://localhost:3000/api/v1/login', {
      method: 'GET',
      headers: {
        "x-token": key,
        "CONTENT-TYPE": 'application/json'
      }
    });
    const userData = await loginResponse.json();

    this.props.updateUser(userData);
    this.props.history.push('/user');
  }

  checkForKey() {
    console.log(this.props.location.search.length);
    const userKey = JSON.parse(localStorage.getItem('123rtx-token'));
    if (this.props.location.search.length > 500) {
      const passedToken = this.getToken();
      localStorage.setItem('123rtx-token', JSON.stringify(passedToken));
      this.sendKey(passedToken);
    } else if (userKey) {
      this.sendKey(userKey);
      console.log('sent via local');
    }

    //pass to backend
    // fetch('/api/v1/login', {
    //   headers: {
    //     x-token: 
    //   }
    // })
  }

  getToken () {
    const tokenRegex = new RegExp(/\?token=/);
    const parseToken = this.props.location.search.replace(tokenRegex, '');
    return parseToken;
  }

  render() {
    // this.getToken();
    return (
      <div className="user-component">
        <UserData />
        <UserProfile />
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