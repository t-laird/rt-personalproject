import React, { Component } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import * as actions from '../../Actions';
import validateGroup from '../../helpers/validateGroup';
import './CreateGroup.css';
import makeGroup from '../../helpers/fetches/makeGroup/makeGroup';
import PropTypes from 'prop-types';

export class CreateGroup extends Component {
  constructor() {
    super();

    this.state = {
      groupName: '',
      weeklyPoints: '',
      message: 'CREATE A GROUP'
    };
  }

  createGroup = async (event, groupName, weeklyPoints) => {
    event.preventDefault();

    const password = generator.generate({
      length: 6,
      number: true
    });

    const groupResponse = await makeGroup(groupName, weeklyPoints, password);
    this.props.updateGroup(groupResponse[0]);

    const userResponse = await validateGroup(groupResponse[0].group_passphrase, this.props.user.user_id);
    this.props.updateUser(userResponse[0]);
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="create-group-component">
        <div className="create-group-heading">
          <h4>{this.state.message}</h4>
        </div>
        <form>
          <div className="create-top">
            <h5>Let's give your group a name!</h5>
            <input 
              className="group-name-input"
              onChange={this.handleChange}
              placeholder='group name'
              value={this.state.groupName}
              name='groupName'
            />
          </div>
          <h5>With SNAP NINJA, your group members get a bucket of snaps each week to give away to deserving teammates.</h5>
          <div className="create-bottom">
            <h5>How many snaps will your group members be able to give away? <span className="join-span">(We recommend 50)</span></h5>
            <input
              className="points-input"
              onChange={this.handleChange}
              placeholder='QTY'
              value={this.state.weeklyPoints}
              name='weeklyPoints'
            />
          </div>
          <button
            onClick={(event) => this.createGroup(event, this.state.groupName, this.state.weeklyPoints)}
          >CREATE
          </button>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = ( store ) => ({
  user: store.User
});

export const mapDispatchToProps = dispatch => ({
  updateGroup: group => {
    dispatch(actions.updateGroup(group));
  },
  updateUser: user => {
    dispatch(actions.updateUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

CreateGroup.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func,
  updateGroup: PropTypes.func
};