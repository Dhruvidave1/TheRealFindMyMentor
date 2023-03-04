import React, { useState, useEffect, useContext } from "react";
import MatchProfile from "../components/MatchProfile";
import "./Match.css";
import { APIContext } from "../context/api-provider";

function Match() {
  const [mentors, setMentors] = useState([]);
  const { getMatches } = useContext(APIContext);

  useEffect(() => {
    async function prepareMentors() {
      const data = await getMatches();
      setMentors(data.matches.mentors);
      console.log(mentors);
    }

    prepareMentors();
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
