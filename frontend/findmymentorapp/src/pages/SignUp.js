import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Chip, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { APIContext } from "../context/api-provider.js";

import * as React from "react";
import {
  AREA,
  DESIGNATION,
  SKILLS_GOALS,
  YEARS_OF_PRACTICE,
  ZONE,
} from "../constants.mjs";

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(area, areaOfPractice, theme) {
  return {
    fontWeight:
      areaOfPractice.indexOf(area) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [biography, setBiography] = React.useState("");
  const [isMentee, setIsMentee] = React.useState(false);
  const [isMentor, setIsMentor] = React.useState(false);
  const [yearsOfPractice, setYearsOfPractice] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [zone, setZone] = React.useState("");
  const { register } = useContext(APIContext);

  const [areaOfPractice, setAreaOfPractice] = React.useState([]);
  const [skills, setSkills] = React.useState([]);

  const [areaOfIntrest, setAreaOfInterest] = React.useState([]);
  const [mentorshipGoals, setMentorshipGoals] = React.useState([]);

  const handleMenteeClick = () => {
    setIsMentor(false);
    setIsMentee(true);
  };

  const handleMentorClick = () => {
    setIsMentee(false);
    setIsMentor(true);
  };

  const handleBothClick = () => {
    setIsMentee(true);
    setIsMentor(true);
  };

  const handleAreaOfPracticeChange = (event) => {
    const {
      target: { value },
    } = event;
    setAreaOfPractice(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleAreaOfInterestChange = (event) => {
    const {
      target: { value },
    } = event;
    setAreaOfInterest(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleMentorshipGoalsChange = (event) => {
    const {
      target: { value },
    } = event;
    setMentorshipGoals(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const profile = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      workLocation: location,
      isMentor: isMentor,
      isMentee: isMentee,
      yearsOfPractice: yearsOfPractice,
      designation: designation,
      zone: zone,
    };

    if (isMentee && !isMentor) {
      profile.areasInterest = areaOfIntrest;
      profile.mentorshipGoals = mentorshipGoals;
    } else if (isMentor && !isMentee) {
      profile.areaPractice = areaOfPractice;
      profile.skills = skills;
    } else {
      profile.areasInterest = areaOfIntrest;
      profile.mentorshipGoals = mentorshipGoals;
      profile.areaPractice = areaOfPractice;
      profile.skills = skills;
    }
    register(profile);
    console.log(profile);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  type="location"
                  id="location"
                  autoComplete="off"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="biography"
                  label="About Me"
                  type="biography"
                  id="biography"
                  autoComplete="off"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="years-of-practice-select-label">
                      Years of Practice
                    </InputLabel>
                    <Select
                      labelId="years-of-practice-select-label"
                      id="years-of-practice-select-label"
                      label="Years of Practice"
                      value={yearsOfPractice}
                      onChange={(e) => setYearsOfPractice(e.target.value)}
                    >
                      {YEARS_OF_PRACTICE.map((choice) => (
                        <MenuItem value={choice}>{choice}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="designaiton-select-label">
                      Designation
                    </InputLabel>
                    <Select
                      labelId="designation-select-label"
                      id="designation-select-label"
                      label="Designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    >
                      {DESIGNATION.map((choice) => (
                        <MenuItem value={choice}>{choice}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="zone-select-label">Zone</InputLabel>
                    <Select
                      labelId="zone-select-label"
                      id="zone-select-label"
                      label="zone"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      {ZONE.map((choice) => (
                        <MenuItem value={choice}>{choice}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid container justifyContent="center">
                <Stack direction="row" spacing={1}>
                  <Chip label="Mentee" onClick={handleMenteeClick} />
                  <Chip label="Mentor" onClick={handleMentorClick} />
                  <Chip label="Both" onClick={handleBothClick} />
                </Stack>
              </Grid>
              <div>
                {isMentor && (
                  <div>
                    <div>
                      <FormControl sx={{ m: 1, width: 600 }}>
                        <InputLabel id="multiple-area-label">
                          Area of Practice
                        </InputLabel>
                        <Select
                          labelId="multiple-area-label"
                          id="multiple-area"
                          multiple
                          value={areaOfPractice}
                          onChange={handleAreaOfPracticeChange}
                          input={<OutlinedInput label="Area of Practice" />}
                          MenuProps={MenuProps}
                        >
                          {AREA.map((area) => (
                            <MenuItem
                              key={area}
                              value={area}
                              style={getStyles(area, areaOfPractice, theme)}
                            >
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ m: 1, width: 600 }}>
                        <InputLabel id="multiple-skill-label">
                          Skills
                        </InputLabel>
                        <Select
                          labelId="multiple-skill-label"
                          id="multiple-akill"
                          multiple
                          value={skills}
                          onChange={handleSkillsChange}
                          input={<OutlinedInput label="SKills" />}
                          MenuProps={MenuProps}
                        >
                          {SKILLS_GOALS.map((skill) => (
                            <MenuItem
                              key={skill}
                              value={skill}
                              style={getStyles(skill, skills, theme)}
                            >
                              {skill}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                )}

                {isMentee && (
                  <div>
                    <div>
                      <FormControl sx={{ m: 1, width: 600 }}>
                        <InputLabel id="multiple-area-label">
                          Area of Interest
                        </InputLabel>
                        <Select
                          labelId="multiple-area-label"
                          id="multiple-area"
                          multiple
                          value={areaOfIntrest}
                          onChange={handleAreaOfInterestChange}
                          input={<OutlinedInput label="Area of Interest" />}
                          MenuProps={MenuProps}
                        >
                          {AREA.map((area) => (
                            <MenuItem
                              key={area}
                              value={area}
                              style={getStyles(area, areaOfIntrest, theme)}
                            >
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ m: 1, width: 600 }}>
                        <InputLabel id="multiple-goal-label">
                          Mentorship Goals
                        </InputLabel>
                        <Select
                          labelId="multiple-goal-label"
                          id="multiple-goal"
                          multiple
                          value={mentorshipGoals}
                          onChange={handleMentorshipGoalsChange}
                          input={<OutlinedInput label="Mentorship Goals" />}
                          MenuProps={MenuProps}
                        >
                          {SKILLS_GOALS.map((goal) => (
                            <MenuItem
                              key={goal}
                              value={goal}
                              style={getStyles(goal, mentorshipGoals, theme)}
                            >
                              {goal}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                )}
              </div>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
