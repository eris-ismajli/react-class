import React, { useState } from "react";

const CORRECT_USER = "erisismajli";
const CORRECT_PASS = "eris1234";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(loginData);
  };

  const handleLogin = () => {
    const { username, password } = loginData;

    if (username.trim() === "" || password.trim() === "") {
      setMessage("Please fill in all the required fields.");
      return;
    }

    if (username.trim() !== CORRECT_USER || password.trim() !== CORRECT_PASS) {
      setMessage("Invalid credentials");
      return;
    }

    setMessage("Login Success!");
    setIsLoggedIn(true);
  };


  return (
    <div>
      <h1>Simple Login</h1>
      {!isLoggedIn && (
        <div>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="username"
          />
          <br />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Login;
