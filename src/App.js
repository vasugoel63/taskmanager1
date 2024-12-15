import {BrowserRouter , Routes, Route, useNavigate} from "react-router-dom";
import Login from "./Pages/Login";
import TaskListPage from "./Pages/TaskList";
import UserDashboard from "./Pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <div className="App">
      <ToastContainer />
       <BrowserRouter>
       
      <Routes>

        <Route path="/login"element={<Login/>}/>
        <Route path="/tasklist" element={
              <PrivateRoute element={<TaskListPage />} />
            }/>
        <Route path="/user/dashboard"  element={
              <PrivateRoute element={<UserDashboard />} />
            }/>


      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
