import React, { Component } from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';
import Leaderboard from '../Leaderboard/Leaderboard';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Group extends Component {

  componentDidMount() {
    if (!this.props.User.name) {
      this.props.history.push('/login');
      return;
    }
    if (!this.props.User.group_id) {
      this.props.history.push('/joingroup');
      return;
    }
  }

  render() {
    return (
      <div className="group-component">
        <GroupData />
        <Leaderboard />
        <GroupProfile />
        <NavLink className="join-group" to='/joingroup'>SWITCH GROUPS</NavLink>
      </div>
    ); 
  }
}

export const mapStateToProps = ( store ) => ({
  User: store.User
});

export default connect(mapStateToProps, null)(Group);

Group.propTypes = {
  User: PropTypes.object,
  history: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
};