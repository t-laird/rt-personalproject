import React from 'react';
import './Member.css';

const Member = ({ name, updateRecipient }) => {

  return (
    <div 
      className="member-component"
      onClick={() => updateRecipient(name)}
    >
      <h5>{name}</h5>
    </div>
  )
}

export default Member;