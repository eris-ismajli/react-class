import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CORRECT_USER = "admin";
const CORRECT_PASS = "root";

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = () => {
    if (
      userData.username !== CORRECT_USER ||
      userData.password !== CORRECT_PASS
    ) {
      alert("Invalid credentials");
      return;
    }

    setIsLoggedIn(true);
    navigate("/users")
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        placeholder="Username"
      />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        placeholder="Password"
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
