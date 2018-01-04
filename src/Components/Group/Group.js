import React, { Component } from 'react';
import './Group.css';
import GroupData from '../GroupData/GroupData';
import GroupProfile from '../GroupProfile/GroupProfile';
import Leaderboard from '../Leaderboard/Leaderboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Group extends Component {

  componentDidMount() {
    if (!this.props.User.name) {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div className="group-component">
        <GroupData />
        <GroupProfile />
        <Leaderboard />
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
  history: PropTypes.object
};