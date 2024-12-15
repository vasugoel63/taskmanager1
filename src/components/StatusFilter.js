import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
const StatusFilter = ({ selectedStatus, onStatusChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        label="Status"
        sx={{ width: '100%' }} 
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
    </FormControl>
  );
};


export default StatusFilter;

