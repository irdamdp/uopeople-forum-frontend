const dbconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
// const { get } = require("../route/questionroute");

async function insertquest(req, res) {
  const questionid = uuidv4();
  const { title, description, userid, tag } = req.body;
  // console.log(title, description, userid);
  if (!title || !description || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }

  try {
    const result = await dbconnection.query(
      "INSERT INTO questions( questionid, userid, title, description, tag ) VALUES (?,?,?,?,?)",
      [questionid, userid, title, description, tag]
    );

    res.status(StatusCodes.OK).json({ msg: "question added successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function bringquest(req, res) {
  try {
    const [questions] = await dbconnection.query(
      "SELECT id, userid, title, description, questionid FROM questions ORDER BY id DESC"
    );

    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function getquest(req, res) {
  const questionid = req.params.questionid;

  try {
    const [questions] = await dbconnection.query(
      "SELECT id, userid, title, tag, description, questionid FROM questions WHERE questionid = ?",
      [questionid]
    );
    res.status(StatusCodes.OK).json(questions[0]);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

module.exports = { insertquest, bringquest, getquest };
