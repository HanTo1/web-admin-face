import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { setUserSession } from "../../utils/Common";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("response: ", response);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 400) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="container">
      <div className="center-login">
        <h1>Login</h1>
        <form action="">
          <div className="txt_field">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>UserName</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {error && <div className="error">{error}</div>}
          <input type="submit" value="Login" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default Login;
