import React from 'react';
import './CommentCard.css';

const CommentCard = ({ displayTextValue, value, sender, day }) => {

	const displayText = [
		`${value} points for you!`, 
		`You get ${value} points!`, 
		`Blam! ${value} points!`, 
		`${value} points!  Yeah!`, 
		`${value} big ole points!`
	]

	return (
		<div className="comment-card-component">
			<div className="card-header">
				<h3>{displayText[displayTextValue]}</h3><h5 className="day-span">{day}</h5>
			</div>
			<p>Thanks for your help with JS array prototypes.  You totally crushed it!</p>
			<div className="card-footer">
				<h4><img src={require('../Header/assets/ninja-logo.svg')} alt="ninja-icon" />{sender}</h4>
			</div>
		</div>
	)
}

export default CommentCard;