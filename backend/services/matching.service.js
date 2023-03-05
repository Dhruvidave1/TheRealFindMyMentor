import Profile from "../models/profileModel.js";

const USER_CAN_MENTOR = {
  NP: ["NP", "RN", "RPN", "Student"],
  RN: ["RN", "LPN", "HCA", "Student"],
  RPN: ["RPN", "LPN", "HCA", "Student"],
  LPN: ["LPN", "HCA", "Student"],
  HCA: ["HCA"],
  Student: [],
};
const NUM_MATCHES_TO_RETURN = 10;

// import dotenv from "dotenv";
// import connectDB from "../config/db.js";
// import { exit } from "process";
// dotenv.config();
// await connectDB();
// getMatches("6403781cb92f9eed2bdcc524");
// exit();

export async function getMatches(uid) {
  const user = await Profile.findById(uid).exec();
  if (!user) {
    console.log("User not found");
    return null;
  }
  const matches = {};
  if (user.isMentor) {
    matches.mentees = await getMentees(user);
  }
  if (user.isMentee) {
    matches.mentors = await getMentors(user);
  }

  //   console.log("Number of mentors: " + matches.mentors?.length || 0);
  //   console.log("Number of mentees: " + matches.mentees?.length || 0);
  return matches;
}

async function getMentees(user) {
  const menteeDesignations = USER_CAN_MENTOR[user.designation];
  const potentialMatches = await getAllEligibleUsers(
    menteeDesignations,
    "mentees"
  );
  const result = getBestMatches(user, potentialMatches);
  return result.slice(0, NUM_MATCHES_TO_RETURN);
}

async function getMentors(user) {
  const mentorDesignations = getEligibleMentorDesignations();
  const potentialMatches = await getAllEligibleUsers(
    mentorDesignations,
    "mentors"
  );
  
  
  const result = getBestMatches(user, potentialMatches);
  //   console.log("Number of mentors: " + result.length);
  //   console.log(result.map((r) => r.matchScore));
  return result.slice(0, NUM_MATCHES_TO_RETURN);

  function getEligibleMentorDesignations() {
    const mentorDesignations = [];
    for (const mentorGroup in USER_CAN_MENTOR) {
      if (USER_CAN_MENTOR[mentorGroup].includes(user.designation)) {
        mentorDesignations.push(mentorGroup);
      }
    }
    return mentorDesignations;
  }
}

async function getAllEligibleUsers(allowedDesignations, userType) {
  const query = Profile.find({
    designation: { $in: allowedDesignations },
  });
  if (userType === "mentors") {
    query.where("isMentor", true);
  } else if (userType === "mentees") {
    query.where("isMentee", true);
  }
  
  return await query.exec();
}

function getBestMatches(user, matches) {
  const result = [...matches];
  for (const match of result) {
    match.matchScore = generateMatchScore(match);
  }
  return result
    .filter((match) => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  function generateMatchScore(match) {
    let result = 0;
    result += countMatches(user.zone, match.zone);
    if (user.isMentee) {
      result += countMatches(user.areasInterest, match.areaPractice);
      result += countMatches(user.mentorshipGoals, match.skills);
    }
    if (user.isMentor) {
      result += countMatches(match.areaPractice, user.areasInterest);
      result += countMatches(match.skills, user.mentorshipGoals);
    }
    return result;
  }

  function countMatches(userField, matchField) {
    let result = 0;

    if (!userField || !matchField) {
      return result;
    }
    for (const item of userField) {
      if (matchField.includes(item)) {
        result++;
      }
    }
    return result;
  }
}
