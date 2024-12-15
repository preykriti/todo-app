import "./Login.css"

const Login = () => {
  return (
    <div className="login-page">
      <h3>Login</h3>
      <input type="email" placeholder="Enter your email"></input>
      <input type="password" placeholder="Enter your password"></input>
      <button>Login</button>
    </div>
  );
}

export default Login