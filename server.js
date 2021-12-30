const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tanataan application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
const { user: User, role: Role, question: Question, score: Score} = db;
// const Role = db.role;
// const Question = db.question;

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and Resync database");
    initial();
  })
  .catch((error) => console.log(error));

// db.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });

  // User.create({
  //   username: "ngoctan",
  //   email: "ngoctan@gmail.com",
  //   password: bcrypt.hashSync("123123", 8),
  //   roles: ["admin"],
  // });

  Question.create({
    question: "1+1=?",
    answers: { a: "0", b: "1", c: "2", d: "3" },
    multi: false,
    correctAnswer: "c",
  });

  Question.create({
    question: "2+2=?",
    answers: { a: "0", b: "1", c: "4", d: "3" },
    multi: false,
    correctAnswer: "c",
  });

  Question.create({
    question: "4+1=?",
    answers: { a: "0", b: "1", c: "5", d: "3" },
    multi: false,
    correctAnswer: "c",
  });
  Question.create({
    question: "1+1=?",
    answers: { a: "0", b: "1", c: "2", d: "3" },
    multi: false,
    correctAnswer: "c",
  });

  Question.create({
    question: "2-2=?",
    answers: { a: "-0", b: "+0", c: "4", d: "3" },
    multi: true,
    correctAnswer: "ab",
  });

}
