import React from 'react';
import './CommentCard.css';
import PropTypes from 'prop-types';

const CommentCard = ({ displayTextIndex, value, note, sender, day }) => {

  const displayText = [
    `${value} snaps for you!`, 
    `You get ${value} snaps!`, 
    `Blam! ${value} snaps!`, 
    `${value} snaps!  Oh snap!`, 
    `${value} big ole snap!`
  ];

  return (
    <div className="comment-card-component">
      <div className="card-header">
        <h6>{displayText[displayTextIndex]}</h6><h5 className="day-span">{day}</h5>
      </div>
      <p>{note}</p>
      <div className="card-footer">
        <img src={require('../Header/assets/ninja-logo.svg')} alt="ninja-icon" />
        <h6>{sender}</h6>
      </div>
    </div>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  displayTextIndex: PropTypes.number,
  value: PropTypes.number,
  note: PropTypes.string,
  sender: PropTypes.string,
  day: PropTypes.string
};