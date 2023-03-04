import React, { useState, useEffect } from "react";
import MatchProfile from "../components/MatchProfile";
import "./Match.css";

const people = [
  {
    firstName: "Ella",
    lastName: "LEWIS",
    email: "ella.lewis@email.com",
    password: "password",
    workLocation: "Hospital X",
    isMentor: false,
    isMentee: true,
    yearsOfPractice: "< 1 year",
    designation: "RPN",
    zone: "South",
    areasInterest: ["Home Care", "Addiction/Mental Health"],
    mentorshipGoals: ["Staff Safety", "Community Resources", "Staff Safety"],
    image: "/Images/ProfilePictures/1.jpeg",
  },
  {
    firstName: "Olive",
    lastName: "BROWN",
    email: "olive.brown@email.com",
    password: "password",
    workLocation: "Hospital X",
    isMentor: false,
    isMentee: true,
    yearsOfPractice: "5-10 years",
    designation: "NP",
    zone: "Central",
    areasInterest: ["Primary Care", "Oncology"],
    mentorshipGoals: ["Career goals", "Boundary Setting", "Public Speaking"],
    image: "/Images/ProfilePictures/2.jpeg",
  },
  {
    firstName: "Georgia",
    lastName: "LOPEZ",
    email: "georgia.lopez@email.com",
    password: "password",
    workLocation: "Hospital X",
    isMentor: false,
    isMentee: true,
    yearsOfPractice: "5-10 years",
    designation: "RPN",
    zone: "Central",
    areasInterest: ["Nephrology", "Medicine"],
    mentorshipGoals: [
      "Professional Growth",
      "System Thinking",
      "Public Speaking",
    ],
    image: "/Images/ProfilePictures/3.jpeg",
  },
];

function Match() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      const token = localStorage.getItem("jwt"); // get token from session storage
      const response = await fetch("http://localhost:4000/api/match", {
        headers: {
          Authorization: `Bearer ${token}`, // add Authorization header with the token
        },
      });
      const data = await response.json();
      setMentors(data.matches.mentors);
      console.log(mentors);
    }

    fetchMentors();
  }, []);

  return (
    <div className="match-container">
      {mentors &&
        mentors.map((person, index) => (
          <MatchProfile person={person} key={index} />
        ))}
    </div>
  );
}

export default Match;
