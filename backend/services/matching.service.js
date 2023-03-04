import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Profile from "../models/profileModel.js";

const USER_CAN_MENTOR = {
  NP: ["NP", "RN", "RPN", "Student"],
  RN: ["RN", "LPN", "HCA", "Student"],
  RPN: ["RPN", "LPN", "HCA", "Student"],
  LPN: ["LPN", "HCA", "Student"],
  HCA: ["HCA"],
  Student: [],
};

dotenv.config();
await connectDB();
getMatches("6403781cb92f9eed2bdcc524");

export async function getMatches(uid) {
  const user = await Profile.findById(uid).exec();
  console.log(user);
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
  return matches;
}

async function getMentees(user) {
  const menteeDesignations = USER_CAN_MENTOR[user.designation];
  const potentialMatches = await getAllEligibleUsers(
    menteeDesignations,
    "mentees"
  );
  const result = getBestMatches(user, potentialMatches);
  console.log("Number of mentees: " + result.length);
  console.log("Top 3 matches:");
  for (let i = 0; i < 5; i++) {
    console.log(result[i].matchScore, result[i]);
  }
  return result;
}

async function getMentors(user) {
  const mentorDesignations = getEligibleMentorDesignations();
  const potentialMatches = await getAllEligibleUsers(
    mentorDesignations,
    "mentors"
  );
  const result = getBestMatches(user, potentialMatches);

  console.log("Number of mentors: " + result.length);
  console.log("Top 3 matches:");
  console.log(result.map((r) => r.matchScore));
  //   for (let i = 0; i < 5; i++) {
  //     console.log(result[i].matchScore, result[i]);
  //   }

  return result;

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
    match.matchScore = genMatchScore(match);
  }
  return result
    .filter((match) => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  function genMatchScore(match) {
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
    for (const item of userField) {
      if (matchField.includes(item)) {
        result++;
      }
    }
    return result;
  }
}
