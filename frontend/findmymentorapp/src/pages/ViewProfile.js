import React from 'react';
import './ViewProfile.css';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import { useState} from "react";



function ViewProfile() {

    const [nurse_name, setNurseName] = useState("");

    return (
        <div className='all'>
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
            <div className='headshot'>
                <img src={"Images/DC_Headshot.jpg" } alt="headshot" width="200" length= "200" ></img>
            </div>

            <div className='yop'>
                <h1>Years of Practice</h1>
            </div>
            <Menu></Menu>
            <TextField className='years'
            required 
            id='outlined-required'
            helperText="EX: Billy Bob Joe"
            value={nurse_name}
            onChange={(e)=>setNurseName(e.target.value)}>
            </TextField>
    
            <div className='zone'>
                <h1>Zone</h1>
            </div>

            <div className='aop'>
                <h1>Area of Practice</h1>
            </div>

            <div className='skillgoal'>
                <h1>Skills Goal</h1>
            </div>

        </div>



    )
}

export default ViewProfile;