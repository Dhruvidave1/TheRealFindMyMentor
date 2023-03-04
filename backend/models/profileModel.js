import mongoose from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import {
  YEARS_OF_PRACTICE,
  DESIGNATION,
  ZONE,
  AREA,
  SKILLS_GOALS,
} from "../../common/constants.mjs";

const profileSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  workLocation: {
    type: String,
    required: true,
  },
  isMentor: {
    type: Boolean,
    required: true,
    default: false,
  },
  isMentee: {
    type: Boolean,
    required: true,
    default: false,
  },
  yearsOfPractice: {
    type: String,
    required: true,
    enum: YEARS_OF_PRACTICE,
  },
  designation: {
    type: String,
    required: true,
    enum: DESIGNATION,
  },
  zone: {
    type: String,
    required: true,
    enum: ZONE,
  },
  areaPractice: {
    type: String,
    required: [
      function () {
        return this.isMentor;
      },
      "'Area of Practice' is required for Mentors",
    ],
    enum: AREA,
  },
  skills: {
    type: [String],
    required: [
      function () {
        return this.isMentor;
      },
      "'Skills' are required for Mentors",
    ],
    enum: SKILLS_GOALS,
  },
  areasInterest: {
    type: [String],
    required: [
      function () {
        return this.isMentee;
      },
      "'Area of Interest' are required for Mentees",
    ],
    enum: AREA,
  },
  mentorshipGoals: {
    type: [String],
    required: [
      function () {
        return this.isMentee;
      },
      "'Mentorship Goals' are required for Mentees",
    ],
    // enum: SKILLS_GOALS,
  },
});

profileSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

profileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
