import React from 'react';
import './LeaderboardDisplay.css';

const LeaderboardDisplay = ({ name, points, position }) => {

  return (
    <div className="leaderboard-display-component">
      <h3 className="leaderboard-position">{position}.</h3>
      <h3 className="leaderboard-name">{name}</h3>
      <h3 className="leaderboard-points">{points}</h3>
    </div>
  ) 
}

export default LeaderboardDisplay;