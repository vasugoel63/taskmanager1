import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { useState } from 'react';
import EditTaskModal from './EditTaskModal';


const paginationModel = { page: 0, pageSize: 5 };

export default function TaskList({tasks, setSelectedIds}) {
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelection) => {
    console.log('Selected IDs:', newSelection);
    setSelectedIds(newSelection); 
    setSelectedRows(newSelection);
  };
  const handleOpen = (id) => {
    setTaskId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: 'taskid', headerName: 'Task ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 160,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 160,
    },
    {
      field: 'totalTime',
      headerName: 'Total Time(in hrs)',
      width: 160,
    },
    { field: 'edit', headerName: 'Edit', width: 160, renderCell: (params) => (
      <Button onClick={() => handleOpen(params.row.taskid)} color="primary"   sx={{
        '&:hover': {
          borderColor: 'blue', 
          backgroundColor: 'blue', 
          color: 'white',
        },
      }}>Edit</Button>
    )},
  ];
  
  const calculateTotalTime = (startTime, endTime) => {
    const start = dayjs(startTime);
    const end = dayjs(endTime);
    const diffInHours = end.diff(start, 'hour', true); 
    return diffInHours.toFixed(2); 
  };
  const rows = tasks.map((task, index) => ({
    id: task._id,
    taskid: task._id,
    title: task.title,
    priority: task.priority,
    status: task.status,
    startTime: dayjs(task.startTime).format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs(task.endTime).format('YYYY-MM-DD HH:mm:ss'),
    totalTime: calculateTotalTime(task.startTime, task.endTime),
    edit: 'Edit', 
  }));

  return (
    <>
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        sx={{ border: 0 }}
      />
    </Paper>
    <EditTaskModal
    open={open}
    onClose={handleClose}
    taskId= {taskId}
    />

    </>

  );
}