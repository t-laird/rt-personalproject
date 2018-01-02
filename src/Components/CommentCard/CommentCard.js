import React from 'react';
import './CommentCard.css';

const CommentCard = ({ displayTextIndex, value, note, sender, day }) => {

  const displayText = [
    `${value} points for you!`, 
    `You get ${value} points!`, 
    `Blam! ${value} points!`, 
    `${value} points!  Yeah!`, 
    `${value} big ole points!`
  ];

  return (
    <div className="comment-card-component">
      <div className="card-header">
        <h3>{displayText[displayTextIndex]}</h3><h5 className="day-span">{day}</h5>
      </div>
      <p>{note}</p>
      <div className="card-footer">
        <img src={require('../Header/assets/ninja-logo.svg')} alt="ninja-icon" />
        <h4>{sender}</h4>
      </div>
    </div>
  );
};

export default CommentCard;