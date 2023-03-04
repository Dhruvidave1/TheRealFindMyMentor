import React from 'react';
import './ViewProfile.css';
import TextField from '@mui/material/TextField';
import { useState} from "react";
import Button from '@mui/material/Button';

function ViewProfile() {

    const [nurse_name, setNurseName] = useState("");
    const [nurse_years, setNurseYears] = useState("");
    const [nurse_zone, setNurseZone] = useState("");
    const [nurse_area, setNurseArea] = useState("");
    const [nurse_skill, setNurseSkill] = useState("");

    return (
        <div className="profile-container">
            <div className='all'>
                <h1> Edit Profile </h1>
                <div className='headshot'>
                    <img src={"Images/DC_Headshot.jpg" } alt="headshot" width="200" length= "200" ></img>
                </div>

                <div className='title'>
                    <h1> Name Of Nurse </h1>
                </div>
                <TextField className='name'
                required 
                id='outlined-required'
                helperText="EX: Billy Bob Joe"
                value={nurse_name}
                onChange={(e)=>setNurseName(e.target.value)}>
                </TextField>
            
                <div className='yop'>
                    <h1>Years of Practice</h1>
                </div>
                <TextField className='years'
                required 
                id='outlined-required'
                helperText="EX: Billy Bob Joe"
                value={nurse_years}
                onChange={(e)=>setNurseYears(e.target.value)}>
                </TextField>
        
                <div className='zone'>
                    <h1>Zone</h1>
                </div>
                <TextField className='years'
                required 
                id='outlined-required'
                helperText="EX: Billy Bob Joe"
                value={nurse_zone}
                onChange={(e)=>setNurseZone(e.target.value)}>
                </TextField>

                <div className='aop'>
                    <h1>Area of Practice</h1>
                </div>
                <TextField className='years'
                required 
                id='outlined-required'
                helperText="EX: Billy Bob Joe"
                value={nurse_area}
                onChange={(e)=>setNurseArea(e.target.value)}>
                </TextField>

                <div className='skillgoal'>
                    <h1>Skills Goal</h1>
                </div>
                <TextField className='years'
                required 
                id='outlined-required'
                helperText="EX: Billy Bob Joe"
                value={nurse_skill}
                onChange={(e)=>setNurseSkill(e.target.value)}>
                </TextField>
            </div>
            <Button
            variant="contained"
            className="save-button"
            >
            Save
            </Button>
        </div>
    )
}

export default ViewProfile;