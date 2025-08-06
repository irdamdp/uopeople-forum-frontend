const dbconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

async function getanswer(req, res) {
  const questionid = req.params.questionid;
  try {
    const [answers] = await dbconnection.query(
      "SELECT answerid, userid, answer, questionid FROM answer WHERE questionid = ? ORDER BY answerid DESC",
      [questionid]
    );
    res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function postanswer(req, res) {
  const { answer, questionid, userid } = req.body;
  if (!answer || !questionid || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }
  try {
    const result = await dbconnection.query(
      "INSERT INTO answer( answer, questionid, userid ) VALUES (?,?,?)",
      [answer, questionid, userid]
    );
    res.status(StatusCodes.OK).json({ msg: "answer added successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}
module.exports = { postanswer, getanswer };
