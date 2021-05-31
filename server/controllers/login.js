const db = require("../db/index.js");
const jwt = require("jsonwebtoken");

var users = [
  {
    email: "abc@gmail.com",
    password: "12345",
  },
];

class Login {
  login = async (req, res) => {
    let result = users.find((user) => user.email == req.body.email);
    if (result) {
      if (result.password == req.body.password) {
        const email = result.email;
        const accessToken = jwt.sign(
          { email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 300,
          }
        );
        res.json({ accessToken, message: "Success!!" });
      } else {
        res.status(400).send({
          message: "Password incorrect!!",
        });
      }
    } else {
      res.status(401).send({
        message: "User not found!!",
      });
    }
    // const email = req.body.email;
    // const user = { name: email };
    // console.log("user: ", user);
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //   expiresIn: 300,
    // });
    // res.json({ accessToken });
  };
}

module.exports = new Login();
