import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserData from '../UserData/UserData';
import UserProfile from '../UserProfile/UserProfile';
import * as actions from '../../Actions/';
import './User.css';
import { NavLink } from 'react-router-dom';
import Transaction from '../Transaction/Transaction';
import Comments from '../Comments/Comments';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinText: 'JOIN A GROUP'
    };
  }

  componentDidMount() {
    if (!this.props.User.name) {
      console.log('trying to fetch user data');
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.User.group_id > 0) {
      this.setState({joinText: 'SWITCH GROUPS'});
    }
  }

  render() {
    return (
      <div className="user-component">
        <UserData />
        <Transaction />
        <Comments />
        <UserProfile />
        <NavLink className="join-group" to='/joingroup'>{this.state.joinText}</NavLink>
      </div>
    );
  }
}

const mapStateToProps = ( store ) => ({
  User: store.User
});


export default connect(mapStateToProps, null)(User);