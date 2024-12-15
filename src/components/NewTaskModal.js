import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Grid } from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskByUser } from '../store/taskSlice';
import dayjs from 'dayjs';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateNewTaskModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState("pending");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  
  const userdata = JSON.parse(localStorage.getItem('user')) || "";
  const userid= userdata.id;


  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleStatusChange = (e) => 
    setStatus(e.target.checked ? 'completed' : 'pending');
  const handleStartTimeChange = (newValue) => {
    if (dayjs(newValue).isValid()) {
      setStartTime(newValue);
    }
  };
  const handleEndTimeChange = (newValue) => {
    if (dayjs(newValue).isValid()) {
      setEndTime(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, priority, status, startTime, endTime });
    dispatch(addTaskByUser({title, priority, status, startTime, endTime, userid: userid}));
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="primary"   sx={{
    '&:hover': {
      borderColor: 'blue', 
      backgroundColor: 'blue', 
      color: 'white',
    },
  }}>Add Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
        <h2>Add new task</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Priority"
              type="number"
              value={priority}
              onChange={handlePriorityChange}
              required
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                checked={status === 'completed'} 
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label={status ? 'Completed' : 'Pending'}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
          
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>

        <DateTimePicker
          label="Start Time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>

    <DateTimePicker
      label="End Time"
      value={endTime}
      onChange={handleEndTimeChange}
    />
  </DemoContainer>
</LocalizationProvider>
      </Grid>

          {/* End Time Field */}
          {/* <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="End Time"
                inputFormat="MM/dd/yyyy hh:mm a"
                value={endTime}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
                required
              />
            </LocalizationProvider>
          </Grid> */}

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
      </Modal>
    </div>
  );
}
