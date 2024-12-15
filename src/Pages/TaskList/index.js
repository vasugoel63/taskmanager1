import TaskList from "../../components/TaskList";
import Header from "../../components/Header";
import CreateNewTaskModal from "../../components/NewTaskModal";
import PriorityFilter from "../../components/PriorityFilter";
import { Button } from "@mui/material";
import StatusFilter from "../../components/StatusFilter";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../../store/taskSlice";
import { clearAction } from "../../store/taskSlice";
import { toast } from "react-toastify";
import {Box} from "@mui/material";
export default function TaskListPage(){
    const dispatch = useDispatch();
    const tasksuccessdata = useSelector((state)=>state.tasks.success);
    const taskcreatesuccessdata = useSelector((state)=>state.tasks.createsuccess);
    const taskdeletesuccessdata = useSelector((state)=> state.tasks.delsuccess);
    const tasksdata = useSelector((state)=>state.tasks.data);
    const userdata = JSON.parse(localStorage.getItem('user')) || "";
    const userid= userdata.id;
    const [tasks,setTasks] = useState([]);
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [selectedIds, setSelectedIds] = useState([]); 
    useEffect(()=>{
        dispatch(getTasks({userid: userid, status, priority}));
    },[taskcreatesuccessdata, status, priority, taskdeletesuccessdata]);
    useEffect(()=>{
        if(taskcreatesuccessdata){
            toast.success('Task Created Successfully');
            dispatch(clearAction());
        }
        if(tasksdata && tasksuccessdata){
            setTasks(tasksdata.data);
            dispatch(clearAction());
        }
        if(taskdeletesuccessdata){
            toast.success('Task Deleted Successfully');
            dispatch(clearAction());
        }
    
    },[tasksdata, tasksuccessdata, taskcreatesuccessdata, taskdeletesuccessdata]);

        const handleStatusChange = (newStatus) => {
            setStatus(newStatus);
          };
        
          const handlePriorityChange = (newPriority) => {
            console.log(newPriority);
            setPriority(newPriority);
          };

          const handleDelete = ()=>{
            dispatch(deleteTask({taskid: selectedIds}));
          }
    return(
        <>
        <Header/>
        <h2 style={{marginTop: '80px'}}>Task List</h2>
        <Box  display="flex" 
    justifyContent="space-between" 
    alignItems="center" 
    sx={{ marginBottom: '16px' }}>
        <Box display="flex" gap={2}>
        <CreateNewTaskModal/>
        <Button
    variant="outlined"
    color="error"
    sx={{
      '&:hover': {
        borderColor: 'red',
        backgroundColor: 'red',
        color: 'white',
      },
    }}
    onClick={handleDelete}
  >
    Delete Selected
  </Button>
        </Box>
        <Box display="flex" gap={5}>
        <PriorityFilter selectedPriority={priority} onPriorityChange={handlePriorityChange}/>
        <StatusFilter selectedStatus={status} onStatusChange={handleStatusChange} />
        </Box>
        </Box>
        <TaskList tasks={tasks} setSelectedIds={setSelectedIds}/>
        </>
    )
}