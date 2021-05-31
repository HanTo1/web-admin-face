const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const teachers = require("./routers/teachers.js");
const students = require("./routers/students.js");
const login = require("./routers/login");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const utils = require("./utils/common.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30md" }));
app.use(cors());

const port = process.env.PORT || 5000;

// static user details
const userData = {
  userId: "789789",
  password: "12345",
  name: "Clue Mediator",
  username: "abc@gmail.com",
  isAdmin: true,
};

app.use(function (req, res, next) {
  var token = req.headers["authorization"];
  if (!token) return next();

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user;
      next();
    }
  });
});

app.use("/teachers", teachers);
app.use("/students", students);

app.post("/login", function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required.",
    });
  }

  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong.",
    });
  }

  const token = utils.generateToken(userData);
  const userObj = utils.getCleanUser(userData);
  return res.json({ user: userObj, token });
});

app.get("/verifyToken", function (req, res) {
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    }
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.listen(port, () => {
  console.log(`server is up listening osn port ${port}`);
});
