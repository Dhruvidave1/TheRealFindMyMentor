import React, { useState } from 'react';
import './MatchProfile.css';
import Button from '@mui/material/Button';

function MatchProfile(props) {
  const { firstName, lastName, workLocation, designation, areasInterest, mentorshipGoals, image } = props.person;
   
  return (
    <div>
      <div className="match-profile">
        <img src={image} alt={`${firstName} ${lastName}`} />
        <h3>{firstName} {lastName}</h3>
        <p>{workLocation}</p>
        <p>{designation}</p>
        <p><strong>Areas of Interest: </strong>{areasInterest.join(', ')}</p>
        <p><strong>Mentorship Goals: </strong>{mentorshipGoals.join(', ')}</p>
        </div>
        <div className="button-container">
        <Button
          variant="contained"
          className="like-button"
        >
          Like
        </Button>
        <Button
          variant="contained"
          className="dislike-button"
        >
          Dislike
        </Button>
      </div>
    </div>
  );
}

export default MatchProfile;
