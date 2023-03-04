import React from 'react';
import { useState, useEffect } from 'react';
import './ViewProfile.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ViewProfile() {
	const [userData, setUserData] = useState({});

	const [nurse_name, setNurseName] = useState('');
	const [nurse_years, setNurseYears] = useState('');
	const [nurse_zone, setNurseZone] = useState('');
	const [nurse_area, setNurseArea] = useState('');
	const [nurse_skill, setNurseSkill] = useState('');

	useEffect(() => {
		async function fetchUserData() {
			const response = await fetch('http://localhost:4000/api/user/', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			});
			const data = await response.json();
			setUserData(data.user);
		}
		fetchUserData();
	}, []);

	// return (
	// 	<div>
	// 		<p>
	// 			{userData.firstName} {userData.lastName}
	// 		</p>
	// 		<p>{userData.email}</p>
	// 		<p>{userData.biography}</p>
	// 		<p>{userData.workLocation}</p>
	// 		<p>{userData.yearsOfPractice}</p>
	// 		<p>{userData.designation}</p>
	// 		<p>{userData.zone}</p>
	// 	</div>
	// );

	return (
		<div className='profile-container'>
			<div className='all'>
				<h1> Edit Profile </h1>

				<div className='headshot'>
					<img
						src={'Images/DC_Headshot.jpg'}
						alt='headshot'
						width='200'
						length='200'
						style={{ borderRadius: '5%' }}
					></img>
				</div>

				<div className='title'>
					<h1>
						{userData.firstName} {userData.lastName}
					</h1>
				</div>

				<div className='email'>
					<p>{userData.email}</p>
				</div>

				<div className='bio'>
					<h1>Biography</h1>
					<p>{userData.biography}</p>
				</div>

				<div className='work'>
					<h1>Work Location</h1>
					<p>{userData.workLocation}</p>
				</div>

				<div className='yop'>
					<h1>Years of Practice</h1>
					<TextField
						className='years'
						required
						id='outlined-required'
						helperText='EX: Billy Bob Joe'
						value={nurse_years}
						onChange={(e) => setNurseYears(e.target.value)}
					></TextField>
				</div>

				<div className='zone'>
					<h1>Zone</h1>
					<TextField
						className='years'
						required
						id='outlined-required'
						helperText='EX: Billy Bob Joe'
						value={nurse_zone}
						onChange={(e) => setNurseZone(e.target.value)}
					></TextField>
				</div>

				<div className='aop'>
					<h1>Area of Practice</h1>
					<TextField
						className='years'
						required
						id='outlined-required'
						helperText='EX: Billy Bob Joe'
						value={nurse_area}
						onChange={(e) => setNurseArea(e.target.value)}
					></TextField>
				</div>

				<div className='skillgoal'>
					<h1>Skills Goal</h1>
					<TextField
						className='years'
						required
						id='outlined-required'
						helperText='EX: Billy Bob Joe'
						value={nurse_skill}
						onChange={(e) => setNurseSkill(e.target.value)}
					></TextField>
				</div>
			</div>

			<Button variant='contained' className='save-button'>
				Save
			</Button>
		</div>
	);

	// return (
	// 	<div className='profile-container'>
	// 		<div className='all'>
	// 			<h1> Edit Profile </h1>

	// 			<div className='headshot'>
	// 				<img
	// 					src={'Images/DC_Headshot.jpg'}
	// 					alt='headshot'
	// 					width='200'
	// 					length='200'
	// 					style={{ borderRadius: '5%' }}
	// 				></img>
	// 			</div>

	// 			<div className='title'>
	// 				<h1> Name Of Nurse </h1>
	// 			</div>

	// 			<TextField
	// 				className='name'
	// 				required
	// 				id='outlined-required'
	// 				helperText='EX: Billy Bob Joe'
	// 				value={nurse_name}
	// 				onChange={(e) => setNurseName(e.target.value)}
	// 			></TextField>

	// 			<div className='yop'>
	// 				<h1>Years of Practice</h1>
	// 			</div>
	// 			<TextField
	// 				className='years'
	// 				required
	// 				id='outlined-required'
	// 				helperText='EX: Billy Bob Joe'
	// 				value={nurse_years}
	// 				onChange={(e) => setNurseYears(e.target.value)}
	// 			></TextField>

	// 			<div className='zone'>
	// 				<h1>Zone</h1>
	// 			</div>
	// 			<TextField
	// 				className='years'
	// 				required
	// 				id='outlined-required'
	// 				helperText='EX: Billy Bob Joe'
	// 				value={nurse_zone}
	// 				onChange={(e) => setNurseZone(e.target.value)}
	// 			></TextField>

	// 			<div className='aop'>
	// 				<h1>Area of Practice</h1>
	// 			</div>
	// 			<TextField
	// 				className='years'
	// 				required
	// 				id='outlined-required'
	// 				helperText='EX: Billy Bob Joe'
	// 				value={nurse_area}
	// 				onChange={(e) => setNurseArea(e.target.value)}
	// 			></TextField>

	// 			<div className='skillgoal'>
	// 				<h1>Skills Goal</h1>
	// 			</div>
	// 			<TextField
	// 				className='years'
	// 				required
	// 				id='outlined-required'
	// 				helperText='EX: Billy Bob Joe'
	// 				value={nurse_skill}
	// 				onChange={(e) => setNurseSkill(e.target.value)}
	// 			></TextField>
	// 		</div>
	// 		<Button variant='contained' className='save-button'>
	// 			Save
	// 		</Button>
	// 	</div>
	// );
}

export default ViewProfile;
