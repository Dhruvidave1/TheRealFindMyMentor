import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Profile from "../models/profileModel.js";
import { genSalt, hash } from "bcrypt";
import sampleProfiles from "./sampleProfiles.json" assert { type: "json" };

dotenv.config();
await connectDB();
dataLoader();

async function dataLoader() {
  const dummyBio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus nec mauris et ultricies. Vestibulum tempor erat a accumsan pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  try {
    await Profile.deleteMany();
    console.log("Hashing passwords...");
    const userProfiles = [...sampleProfiles];
    for (const profile of userProfiles) {
      // hash the passwords
      const salt = await genSalt(10);
      profile.password = await hash(profile.password, salt);
      profile.biography = dummyBio;
    }
    console.log("Inserting data...");
    await Profile.insertMany(userProfiles);
    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
}
