import axios from "axios";

const BASE_URL = 'https://taskmanagerbackend-api.onrender.com';


export const loginForm = async(data)=>{
    try{
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response.data;
    }
    catch(err){
        throw err; 
    }
}



export const getTasksapi = async(data)=>{
    try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/user/gettasks`, data, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return response.data;
    }
    catch(err){
        console.error("Login failed:", err);
        throw err; 
    }
}

export const addTaskByUserapi = async(data)=>{
    try{
        const token = localStorage.getItem('token');

        const response = await axios.post(`${BASE_URL}/user/addtask`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
        }
        catch(err){
            throw err; 
        }
}

export const deleteTaskByUserapi = async(data)=>{
    try{
        const token = localStorage.getItem('token');

        const response = await axios.post(`${BASE_URL}/user/deletetaskdetails`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data;
        }
        catch(err){
            throw err; 
        }
}

export const getSingleTaskapi = async(data)=>{
    try{
        const {id} = data;
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/user/gettaskdetails/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export const updateSingleTaskapi = async(data)=>{
    try{
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/user/updatetaskdetails`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

