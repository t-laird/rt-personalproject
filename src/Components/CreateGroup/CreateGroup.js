import React, { Component } from 'react';
import { connect } from 'react-redux';
import generator from 'generate-password';
import * as actions from '../../Actions';
import validateGroup from '../../helpers/validateGroup';
import getUser from '../../helpers/fetches/getUser/getUser';
import './CreateGroup.css';
import makeGroup from '../../helpers/fetches/makeGroup/makeGroup';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export class CreateGroup extends Component {
  constructor() {
    super();

    this.state = {
      groupName: '',
      weeklyPoints: '',
      message: 'CREATE A GROUP',
      successMessage: ''
    };
  }

  createGroup = async (groupName, weeklyPoints) => {

    const password = generator.generate({
      length: 6,
      number: true
    });

    const groupResponse = await makeGroup(groupName, weeklyPoints, password);
    this.props.updateGroup(groupResponse[0]);

    this.setState({
      successMessage: 
        <h5>{'Congrats!  You\'ve created: '}
          <span className="success-span">{groupResponse[0].group_name}</span>
          <br />Your group passphrase is: 
          <span className="success-span">{groupResponse[0].group_passphrase}</span>
        </h5>
    });

    await validateGroup(groupResponse[0].group_passphrase, this.props.user.user_id);
    const userResponse = await getUser();
    this.props.updateUser(userResponse);
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({[name]: value});
  }

  validatePointValue = (event, groupName, weeklyPoints) => {
    event.preventDefault();
    if ((weeklyPoints > 0 && weeklyPoints <= 500) && (groupName.length)) {
      this.createGroup(groupName, weeklyPoints);
    } else if ((weeklyPoints <= 0 || weeklyPoints > 500) && (groupName.length)) {
      this.setState({
        successMessage: 
        <h5>
          {'Invalid point value.  Please choose a number between 1 - 500.  We recommend 50!'}
        </h5>
      });
    } else if ((weeklyPoints <= 0 || weeklyPoints > 500) || (!groupName.length)) {
      this.setState({
        successMessage:
          <h5>
            {'Please enter a group name!'}
          </h5>
      })
    }
  }

  render() {
    return (
      <div>
        <div className="create-group-component">
          <div className="create-group-heading">
            <h4>{this.state.message}</h4>
          </div>
          <form>
            <div className="create-top">
              <h5>{'Let\'s give your group a name!'}</h5>
              <input 
                className="group-name-input"
                onChange={this.handleChange}
                placeholder='group name'
                value={this.state.groupName}
                name='groupName'
              />
            </div>
            <h5>
              With SNAP NINJA, your group members get a bucket of 
              snaps each week to give away to deserving teammates.
            </h5>
            <div className="create-bottom">
              <h5>
                How many snaps will your group members be able to give away? 
                <span className="join-span"> (Between 1 - 500)</span>
              </h5>
              <input
                className="points-input"
                onChange={this.handleChange}
                placeholder='QTY'
                value={this.state.weeklyPoints}
                name='weeklyPoints'
              />
            </div>
            <div className="success-message">{this.state.successMessage}</div>
            <button
              onClick={(event) => this.validatePointValue(
                event, 
                this.state.groupName, 
                this.state.weeklyPoints
              )}
            >CREATE
            </button>
          </form>
        </div>
        <div className="link-holder">
          <NavLink className="create-group-link" to='/snap-ninja/account'>BACK TO ACCOUNT</NavLink>
        </div>
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