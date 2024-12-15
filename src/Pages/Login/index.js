import { useEffect, useState } from "react";
import axios from 'axios';
// import Header from "../../Component/Header/Header";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { clearauthAction } from "../../store/authSlice";
const Login = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const authResponse = useSelector((state)=> state.auth.data);
    const error = useSelector((state)=> state.auth.error);
    const success = useSelector((state)=>state.auth.success);
    const authResponse = useSelector((state)=> state.auth.data);
    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch(clearauthAction());
      }
      if(success && authResponse){
        toast.success("Login Successfull");
        localStorage.setItem('token', authResponse.data.token);
        localStorage.setItem('user', JSON.stringify(authResponse.data));
        navigate('/user/dashboard');
        dispatch(clearauthAction());
      }
    },[error, success, authResponse]);
    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("login done");
      dispatch(loginUser({email , password}));
    //   await axios.post('http://localhost:3001/login', {email , password})
    //   .then((result)=>{
    //     if(result.status == 200){
    //       localStorage.setItem('user',JSON.
    //       stringify(result.data));
    //       alert("Login successfull");
    //       navigate("/todo");
    //       return;
    //   }
    //     else{
    //       alert("Unexpected response status");
    //     }
    // })
    // .catch((err)=>{
    //   if(err.response.status == 401){
    //     alert("Incorrect Password. Please Try again");
    //   }
    //   else if (err.response.status == 404){
    //     alert("User doesnt exists. Please Enter correct username");
    //   }
    //   else{
    //     alert("Internal server error")
    //   }
    
    // }
    // )
       } 

    
        
      
    return(
        <>
        <Header/>
        <div className="LoginForm" style={{marginTop: "80px"}}>
          <h2>Login </h2>
            <form>
        <label for="emailid">Email id</label>
                <input type="email" value={email} id="emailid" onChange = {(e)=> setEmail(e.target.value)}></input>
                <label for="password">password</label>
                <input type="password" value={password} id="password" onChange = {(e)=> setPassword(e.target.value)}></input>
                <button onClick={handleLogin}>Login Now</button>
                {/* <a href="/forgotpassword">Forgot Password?</a> */}
                </form>
        </div>
        </>
    )

}

export default Login