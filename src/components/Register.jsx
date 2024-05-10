import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (input.username === "" || input.email === "" || input.password === "") {
      alert("Please fill in all fields.");
      return;
    }
    // Generate a UUID for the user
    const userId = uuidv4();
    // Get existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Check if email is already registered

    const isEmailRegistered = existingUsers.some(
      (user) => user.email === input.email
    );
    
    if (isEmailRegistered) {
      alert("This email is already registered.");
      return;
    }

    // Initialize todos for new user
    const newUser = { id: userId, ...input };

    // Add the new user to the existing users array
    existingUsers.push(newUser);

    // Save the updated users array to localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Create an Account</h2>
      <form>
        <div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>

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
          <div>
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </form>
      <div>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <u>Login here</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
