import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import { NavLink } from 'react-router-dom';
import validateGroup from '../../helpers/validateGroup';
import './JoinGroup.css';

export class JoinGroup extends Component {
  constructor() {
    super();

    this.state = {
      passphrase: '',
      message: `You haven't joined a group yet.  And you should!  Enter your group passphrase below:`
    };
  }

  componentDidMount = () => {
    if (this.props.group.group_name) {
      this.setState({message: `You are a member of: ${this.props.group.group_name}.  To switch groups, enter new passphrase below.`});
    } else if (this.props.user.group_id) {
      this.setState({message: 'You are already a member of a group!  To switch groups, enter new passphrase below.'});
    }
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState({[name]: value});
  }

  joinGroup = async (event) => {
    event.preventDefault();
    const response = await validateGroup(this.state.passphrase, this.props.user.user_id);
    this.props.updateUser(response[0]);
  }

  render() {
    return (
      <div className="join-group-component">
        <div className="join-container">
          <h3>{this.state.message}</h3>
          <form>
            <input 
              value={this.state.passphrase}
              onChange={this.handleChange}
              placeholder='passphrase' 
              name='passphrase' />
            <button
              onClick={this.joinGroup}
            >SUBMIT</button>
          </form>
        </div>
        <div className="link-holder">
          <NavLink className="create-group-link" to='/creategroup'>CREATE NEW GROUP</NavLink>
        </div>
      </div>
    ); 
  }
}

export const mapStateToProps = ( store ) => ({
  user: store.User,
  group: store.Group
});

export const mapDispatchToProps = dispatch => ({
  updateUser: user => {
    dispatch(actions.updateUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);