import React from 'react';
import './Member.css';
import PropTypes from 'prop-types';

const Member = ({ name, updateRecipient }) => {

  return (
    <div 
      className="member-component"
      onClick={() => updateRecipient(name)}
    >
      <h5>{name}</h5>
    </div>
  );
};

export default Member;

Member.propTypes = {
  updateRecipient: PropTypes.func,
  name: PropTypes.string
};