import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";

const Signup: React.FC = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e?.target.name]: e.target.value });
  };
  const handleOnClick = (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }
  };
  return (
    <form onSubmit={handleOnClick} className="login-page">
      <h3>Sign Up</h3>
      <input onChange={handleOnChange} name="name" value={user.name} type="text" placeholder="Enter your name"></input>
      <input onChange={handleOnChange} name="" value={user.email} type="email" placeholder="Enter your email"></input>
      <input onChange={handleOnChange} name="" value={user.password} type="password" placeholder="Enter your password"></input>
      <button type="submit">Sign Up</button>
      <Link to="/login" className="link">
        Already have an account? Login
      </Link>
    </form>
  );
};

export default Signup;
