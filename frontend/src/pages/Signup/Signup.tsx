import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e?.target.name]: e.target.value });
  };
  const handleOnClick = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register", user, {
          headers:{
            "Content-Type": "application/json"
          }, withCredentials:true
        }
      );
      if(response.data.success){
        navigate("/home");
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError){
        toast.warning(error.response?.data.message);
      }
      else{
        toast.warning("Unexpected error.")
      }
    }
  };
  return (
    <form onSubmit={handleOnClick} className="login-page">
      <h3>Sign Up</h3>
      <input onChange={handleOnChange} name="name" value={user.name} type="text" placeholder="Enter your name"></input>
      <input onChange={handleOnChange} name="email" value={user.email} type="email" placeholder="Enter your email"></input>
      <input onChange={handleOnChange} name="password" value={user.password} type="password" placeholder="Enter your password"></input>
      <button type="submit">Sign Up</button>
      <Link to="/login" className="link">
        Already have an account? Login
      </Link>
    </form>
  );
};

export default Signup;
