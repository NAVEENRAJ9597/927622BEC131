import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const TimeIntervalSelector = ({ interval, onChange }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Time Interval</InputLabel>
        <Select
          value={interval}
          label="Time Interval"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value={5}>Last 5 minutes</MenuItem>
          <MenuItem value={15}>Last 15 minutes</MenuItem>
          <MenuItem value={30}>Last 30 minutes</MenuItem>
          <MenuItem value={60}>Last hour</MenuItem>
          <MenuItem value={180}>Last 3 hours</MenuItem>
          <MenuItem value={360}>Last 6 hours</MenuItem>
          <MenuItem value={720}>Last 12 hours</MenuItem>
          <MenuItem value={1440}>Last 24 hours</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TimeIntervalSelector;