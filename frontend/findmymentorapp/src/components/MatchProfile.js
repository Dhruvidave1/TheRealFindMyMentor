import React, { useState } from 'react';
import './MatchProfile.css';
import Button from '@mui/material/Button';
import logo from './DC_Headshot1.jpg';

function MatchProfile(props) {
	const {
		firstName,
		lastName,
		workLocation,
		designation,
		areasInterest,
		mentorshipGoals,
		image,
		areaPractice,
		skills,
		isMentor,
		isMentee

	} = props.person;

	return (
		<div>
			<div className='match-profile'>
				<img src={logo} alt={`${firstName} ${lastName}`} />
				<h3>
					{firstName} {lastName}
				</h3>
				<p>{workLocation}</p>
				<p>{designation}</p>
				
				{ isMentee ? (<><p>
					<strong>Areas of Interest:  </strong>
					{ areasInterest.join(', ')}
				</p><p>
					<strong>Mentorship Goals: </strong>
						{mentorshipGoals.join(', ')}
					</p></> 
				) : (<></>)}
				{ isMentor ? (<><p>
					<strong>Areas of Practice: </strong>
					{areaPractice.join(', ')}
				</p><p>
					<strong>Skills: </strong>
					{skills.join(', ')}
					</p></> 
				) : (<></>)}

			</div>
			<div className='button-container'>
				<Button variant='contained' className='like-button'>
					Like
				</Button>
				<Button variant='contained' className='dislike-button'>
					Dislike
				</Button>
			</div>
		</div>
	);
}

export default MatchProfile;
