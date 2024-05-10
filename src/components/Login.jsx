import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // Get users array from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(input.email==='admin@gmail.com' && input.password==='321'){
      navigate('/admin')
      localStorage.setItem("loginUser", true);
      return;
    }
    
    // Find user with matching email and password
    const loggedInUser = users.find(
      (user) => user.email === input.email && user.password === input.password
    );
   
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("loginUser", true);
      // console.log("User todos:", loggedInUser.todos);
      navigate("/");
    } else {
      alert("Email or password is incorrect");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        <div className="btn">
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/register">
            <u>Register here</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
