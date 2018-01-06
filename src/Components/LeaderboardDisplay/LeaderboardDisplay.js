import React from 'react';
import PropTypes from 'prop-types';
import './LeaderboardDisplay.css';

const LeaderboardDisplay = ({ name, points, position }) => {

  return (
    <div className="leaderboard-display-component">
      <h5 className="leaderboard-position">{position}.</h5>
      <h5 className="leaderboard-name">{name}</h5>
      <h5 className="leaderboard-points">{points}</h5>
    </div>
  );
};

export default LeaderboardDisplay;

LeaderboardDisplay.propTypes = {
  name: PropTypes.string,
  points: PropTypes.number,
  position: PropTypes.number
};