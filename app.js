require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");
app.use(cors());

// db connection

const dbconnection = require("./db/dbconfig");

// authentication middleware

const authmiddleware = require("./middleware/authmiddleware");

// use router middleware file

const userroutes = require("./route/userRoute");
const questionroutes = require("./route/questionroute");
const answerroutes = require("./route/answerroute");

// json middleware
app.use(express.json());

// user middleware routes

app.use("/api/users", userroutes);

// question routes middleware
app.use("/api/questions", authmiddleware, questionroutes);
// answer routes middleware
app.use("/api/answer", authmiddleware, answerroutes);

async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    app.listen(port);
    console.log(result);
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();
// listen using this port
