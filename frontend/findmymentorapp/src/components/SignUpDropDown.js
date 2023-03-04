import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

export default function DropDown(props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="years-of-practice-select-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="years-of-practice-select-label"
          id="years-of-practice-select-label"
          value={props.value}
          label={props.label}
          onChange={props.handle}>
          {props.aray.map((choice) => (
            <MenuItem value={choice}>{choice}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
