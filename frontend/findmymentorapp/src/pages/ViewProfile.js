import React from 'react';
import { useState, useEffect } from 'react';

function ViewProfile() {
	const [userData, setUserData] = useState({});

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

	return (
		<div>
			<p>
				{userData.firstName} {userData.lastName}
			</p>
			<p>{userData.email}</p>
			<p>{userData.biography}</p>
			<p>{userData.workLocation}</p>
			<p>{userData.yearsOfPractice}</p>
			<p>{userData.designation}</p>
			<p>{userData.zone}</p>
		</div>
	);
}

export default ViewProfile;
