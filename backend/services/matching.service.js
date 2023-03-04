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
  const result = await Profile.find({
    isMentee: true,
    designation: { $in: menteeDesignations },
  }).exec();
  console.log("Number of mentees: " + result.length);
  return result;
}

async function getMentors(user) {
  const mentorDesignations = [];
  for (const mentorGroup in USER_CAN_MENTOR) {
    if (USER_CAN_MENTOR[mentorGroup].includes(user.designation)) {
      mentorDesignations.push(mentorGroup);
    }
  }
  const result = await Profile.find({
    isMentor: true,
    designation: { $in: mentorDesignations },
  }).exec();
  console.log("Number of mentors: " + result.length);
  return result;
}
