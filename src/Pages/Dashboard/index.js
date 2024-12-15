import Header from "../../components/Header";
import { Grid, Card, CardContent, Typography, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
export default function UserDashboard(){
  const BASE_URL = 'https://taskmanagerbackend-api.onrender.com';
    const totalTasks = 100;
    const completedTasks = 70;
    const pendingTasks = 30;
    const totalTimeLapsed = '150 hours';
    const totalEstimatedTime = '180 hours';
    const averageTime = '2.1 hours';
    const userdata = JSON.parse(localStorage.getItem('user')) || "";
    const userid= userdata.id;
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const pendingTasksData = [
        { taskId: 'T1', title: 'Task 1', priority: 'High', estimatedTime: '5 hours', timeLapsed: '3 hours' },
        { taskId: 'T2', title: 'Task 2', priority: 'Medium', estimatedTime: '6 hours', timeLapsed: '4 hours' },
        { taskId: 'T3', title: 'Task 3', priority: 'Low', estimatedTime: '7 hours', timeLapsed: '5 hours' },
      ];
    
      const completedPercentage = (completedTasks / totalTasks) * 100;
      const pendingPercentage = (pendingTasks / totalTasks) * 100;
      const tasks = [];
      const calculateTimeElapsed = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const elapsedTime = (end - start) / (1000 * 60 * 60); 
        return elapsedTime.toFixed(2);
      };

      useEffect(() => {
        const fetchDashboardDetails = async () => {
            try {
                const token = localStorage.getItem('token'); 

                const data = {userid: userid };
                const response = await axios.post(`${BASE_URL}/user/getdashboarddetails`, data, {
                  headers: {
                      Authorization: `Bearer ${token}`, 
                  },
              });
                setDashboardData(response.data.data);
                setLoading(false);
                console.log(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDashboardDetails();
    }, []);
    return(
        <>
        <Header/>
        {!loading && (
    <div style={{ padding: '20px', marginTop: '60px' }}>
    <Typography variant="h6">Summary</Typography>
    <Grid container spacing={3}>

    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4"  sx={{color: "#1976d2"}}>{dashboardData?.totalTasks}</Typography>
          <Typography variant="body2">Total Tasks</Typography>

        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{color: "#1976d2"}} >{dashboardData?.completedPercentage}%</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">Completed Tasks</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{color: "#1976d2"}}>{dashboardData?.pendingPercentage}%</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">Pending Tasks</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{color: "#1976d2"}}>-</Typography>
          <Typography variant="body2">Average Time Per Completed Task</Typography>

        </CardContent>
      </Card>
    </Grid>
    <Typography variant="h6">Pending Task Summary</Typography>
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{color: "#1976d2"}}>{dashboardData?.pendingtask}</Typography>
          <Typography variant="body2">Pending Tasks</Typography>

        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{color: "#1976d2"}}>-</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">Total time Lapsed</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{color: "#1976d2"}}>-</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">Total time to Finish</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Priority</TableCell>
                  <TableCell>Pending Task</TableCell>
                  <TableCell>Time Elapsed (hrs)</TableCell>
                  <TableCell>Time to Finish (hrs)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData?.tasksList.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.status === 'Pending' ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{calculateTimeElapsed(task.startTime, task.endTime)}</TableCell>s
                    <TableCell>{task.status === 'Pending' ? calculateTimeElapsed(task.startTime, task.endTime) : 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </Grid>

    </div>
        )}
    
        </>
    )
}