import React from 'react';
import './LeaderboardDisplay.css';


const LeaderboardDisplay = ({ name, points, position }) => {

  return (
    <div>
      <h3>{position}. {name}: {points}</h3>
    </div>
  ) 
}

export default LeaderboardDisplay;