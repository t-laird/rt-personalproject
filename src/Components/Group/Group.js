import React, { Component } from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';
import Leaderboard from '../Leaderboard/Leaderboard';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export class Group extends Component {

  componentDidMount() {
    if (!this.props.User.name) {
      this.props.history.push('/login');
    }
    if (!this.props.User.group_id) {
      this.props.history.push('/joingroup');
    }
  }

  render() {
    return (
      <div className="group-component">
        <GroupData />
        <GroupProfile />
      	<Leaderboard />
        <NavLink className="join-group" to='/joingroup'>SWITCH GROUPS</NavLink>
      </div>
    ); 
  }
}

export const mapStateToProps = ( store ) => ({
  User: store.User
});

export default connect(mapStateToProps, null)(Group);