import { useState } from "react";
import "./Login.css"
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login:React.FC =() => {
    const navigate = useNavigate();
    const [user, setUser]=useState({email:"", password:""});
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const handleOnClick = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const response = await axios.post(
              "http://localhost:8080/api/user/login", user, {headers:{
                "Content-Type": "application/json"
              },withCredentials:true}
            );
            if(response.data.success){
                navigate("/home");
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError){
                toast.warning(error.response?.data.message);
            }
            else{
                toast.warning("Unexpected error.")
            }
        }
    }
  return (
    <form onSubmit={handleOnClick} className="login-page">
      <h3>Login</h3>
      <input
        onChange={handleOnChange}
        name="email"
        value={user.email}
        type="email"
        placeholder="Enter your email"
      ></input>
      <input
        onChange={handleOnChange}
        name="password"
        value={user.password}
        type="password"
        placeholder="Enter your password"
      ></input>
      <button type="submit">Login</button>
        <Link to="/signup" className="link">Not registered? Signup</Link>
    </form>
  );
}

export default Login