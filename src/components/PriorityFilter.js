import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';



const names = [
1,2,3,4,5
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const PriorityFilter = ({ selectedPriority, onPriorityChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Priority</InputLabel>
      <Select
        value={selectedPriority}
        onChange={(e) => onPriorityChange(e.target.value)}
        label="Priority"
        sx={{ width: '100%' }} 
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
        <MenuItem value="5">5</MenuItem>

      </Select>
    </FormControl>
  );
};

export default PriorityFilter;
