import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { getsingleTask, clearstAction } from '../store/singletaskSlice';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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

export default function EditTaskModal({open,onClose, taskId}){
  const dispatch = useDispatch();
  const singtasksuccessdata = useSelector((state)=>state.singletask.success);
  const singtaskcontentdata = useSelector((state)=>state.singletask.content);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
      const userdata = JSON.parse(localStorage.getItem('user')) || "";
      const userid= userdata.id;
      const [task, setTask] = useState({});
      useEffect(()=>{
        if(open){
          dispatch(getsingleTask({id: taskId}));
        }
      },[taskId]);
      useEffect(()=>{
        if(singtasksuccessdata && singtaskcontentdata){
          console.log(singtaskcontentdata.data);
          setTask(singtaskcontentdata.data);
          const taskData = singtaskcontentdata.data;
    console.log(taskData);

    setTitle(taskData.title);
    setPriority(taskData.priority);
    setStatus(taskData.status ); 
    setStartTime(dayjs(taskData.startTime)); 
    setEndTime(dayjs(taskData.endTime));
    dispatch(clearstAction());
        }
      },[singtaskcontentdata, singtasksuccessdata]);
  


  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.checked);
  const handleStartTimeChange = (newDate) => setStartTime(newDate);
  const handleEndTimeChange = (newDate) => setEndTime(newDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, priority, status, startTime, endTime });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
        <h2>Edit task</h2>
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
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={status}
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
