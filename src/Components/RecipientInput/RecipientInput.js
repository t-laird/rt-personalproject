import React, { Component } from 'react';
import { connect } from 'react-redux';

class RecipientInput extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: [],
      focus: null,
      recipient: ''
    };
  }

  handleInput = (event) => {
    const { value } = event.target;
    this.setState({
      recipient: value
    });
    this.props.updateRecipient(value);
    this.navigateSuggestions(event);
  }

  populateSuggestions = (event) => {
    const { value } = event.target;
    const query = new RegExp(value, 'gi');

    const userNames = this.props.UserList.map( user => user.name);
    const filterSelf = userNames.filter( user => user !== this.props.User.name);

    const filterUsers = filterSelf.filter( user => query.test(user));
    const firstFive = filterUsers.slice(0, 5);

    if (value.length) {
      this.setState({
        suggestions: firstFive
      });
    } else {
      this.setState({
        suggestions: []
      });
    }
  }

  generateSuggestions = () => {
    const listItems = this.state.suggestions.map( (user, index) => {
      const shouldHighlight = index === this.state.focus ? 'highlight' : '';
      return (
        <li 
          className={shouldHighlight} 
          onClick={(event) => { this.autoComplete(event); }} 
          key={`suggestion${index}`}>{user}</li> 
      );
    });

    if (this.state.recipient === this.state.suggestions[0] && this.state.suggestions.length === 1) {
      return null;
    }

    if (this.state.recipient.length && !this.state.suggestions.length) {
      return <li 
        onClick={
          () => this.setState({recipient: ''})
        }
        className="empty-suggestions">no users found</li>;
    }
    return listItems;
  }

  navigateSuggestions = (event) => {
    if (event.key === 'ArrowDown' && 
    this.state.suggestions.slice(0, 5)[this.state.focus + 1]) {
      event.preventDefault();
      if (this.state.focus === null) {
        this.setState({
          focus: 0,
          recipient: this.state.suggestions[0]
        });
        this.props.updateRecipient(this.state.suggestions[0]);
        
      } else {
        this.setState({
          focus: (Math.min(this.state.focus + 1, 4)),
          recipient: this.state.suggestions[this.state.focus + 1]
        });
        this.props.updateRecipient(this.state.suggestions[this.state.focus + 1]);
      }
    } else if (event.key === 'ArrowUp' && this.state.focus !== null) {
      event.preventDefault();
      if (this.state.focus === 0) {
        this.setState({
          focus: null,
          recipient: ''
        });
        this.props.updateRecipient('');
          
      } else {
        this.setState({
          focus: this.state.focus - 1,
          recipient: this.state.suggestions[this.state.focus - 1]
        });
        this.props.updateRecipient(this.state.suggestions[this.state.focus - 1]);        
      }
    } else if (event.key === 'ArrowDown' && this.state.suggestions.length === 1) {
      this.setState({
        focus: 0,
        recipient: this.state.suggestions[0]
      });
      this.props.updateRecipient(this.state.suggestions[0]);
    }
  }

  autoComplete = (event) => {
    const mockEvent = {target: {value: event.target.innerText}};
    this.props.updateRecipient(event.target.innerText);
    
    this.populateSuggestions(mockEvent);

    this.setState({
      recipient: event.target.innerText
    });
  }

  render() {
    return (
      <div className="RecipientInput">
        <h5 className="snaps">snaps to:</h5>
        <input 
          type="text" 
          placeholder="find a teammate"
          value={this.state.recipient}
          onKeyDown={(event) => { 
            this.navigateSuggestions(event);
          }}
          onChange={(event) => { 
            this.populateSuggestions(event); 
            this.handleInput(event); 
          }} />
        <ul>
          {this.generateSuggestions()}
        </ul>
      </div>
    );
  }
}

export const mapStateToProps = ( store ) => ({
  UserList: store.UserList,
  User: store.User
});


export default connect(mapStateToProps, null)(RecipientInput);