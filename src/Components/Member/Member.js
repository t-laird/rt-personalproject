import React from 'react';
import './Member.css';

const Member = ({ name }) => {

  return (
    <div className="member-component">
      <h5>{name}</h5>
    </div>
  )
}

export default Member;