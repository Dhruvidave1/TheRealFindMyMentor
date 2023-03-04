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
  //   console.log(matches);
  return matches;
}

async function getMentees(user) {
  const menteeDesignations = USER_CAN_MENTOR[user.designation];
  const result = await getAllEligibleUsers(menteeDesignations, "mentees");
  console.log("Number of mentees: " + result.length);
  return result;
}

async function getMentors(user) {
  const mentorDesignations = getEligibleMentorDesignations();
  const result = await getAllEligibleUsers(mentorDesignations, "mentors");
  console.log("Number of mentors: " + result.length);
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
