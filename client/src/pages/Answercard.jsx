import { useEffect, useState } from "react";
import classes from "./styling/answercard.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosbase from "../axiosconfig";
import { useContext } from "react";
import { Appstate } from "../App";
import Questionprofiles from "../components/Questionprofiles";

import { showSuccessAlert } from "../components/alerthelper";
function Answercard() {
  const { user } = useContext(Appstate);
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerpost, setanswerpost] = useState({
    answer: "",
  });
  const [usernames, setUsernames] = useState({});
  const [allanswer, setallanswer] = useState([]);
  const [err, seterr] = useState("");
  //   console.log(questionid);
  console.log(allanswer);

  const navigate = useNavigate();
  useEffect(() => {
    axiosbase
      .get(`/answer/question/${questionid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        const answers = res.data;
        setallanswer(answers);

        // Get unique userids from questions
        const uniqueUserIds = [...new Set(answers.map((a) => a.userid))];

        // Fetch usernames for each userid via query param
        const usernameMap = {};
        await Promise.all(
          uniqueUserIds.map(async (id) => {
            try {
              const response = await axiosbase.get(
                `/users/username?userid=${id}`
              );
              usernameMap[id] = response.data.username;
            } catch (err) {
              console.error("Failed to fetch username for user", id);
              usernameMap[id] = "Unknown";
            }
          })
        );

        setUsernames(usernameMap);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosbase
      .get(`/questions/${questionid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [questionid]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setanswerpost({
      ...answerpost,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!answerpost.answer) {
      seterr("*Enter description");
      return;
    }

    if (!user?.userid) {
      console.error("User ID missing — cannot submit question.");
      seterr("User ID missing — cannot submit question.");
      return;
    }
    try {
      await axiosbase.post(
        "/answer/question",
        {
          questionid: questionid,
          answer: answerpost.answer,
          userid: user?.userid,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      showSuccessAlert(
        "Your Answer Posted Successful!",
        "Click OK to continue",
        () => {
          navigate("/home");
        }
      );
      setanswerpost({
        answer: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={classes.questionwrap}>
        <div className={classes.breadcrumbs}>
          <Link to="/home">Home</Link>
          <Link>/</Link>
          <Link to={`/question/${questionid}`}>Answers</Link>
        </div>
        <div classsName={classes.questiontop}>
          <h2>QUESTION</h2>
          <div className={classes.questionIconwrapper}>
            {" "}
            <span className={`material-symbols-outlined ${classes.iconni}`}>
              arrow_circle_right
            </span>
            <div className={classes.description}> {question?.title} </div>
          </div>
          <p>{question?.description}</p>
        </div>

        <div className={classes.answerwrap}>
          <div className={classes.answer}>Answer From The Community</div>
        </div>
        <div>
          {allanswer.length === 0 ? (
            <p>No answers yet.</p>
          ) : (
            <div className={classes.answerList}>
              {allanswer.map((ans) => (
                <Questionprofiles
                  data={ans}
                  username={usernames[ans.userid]}
                  key={ans.answerid}
                  separator={true}
                />
              ))}
            </div>
          )}
        </div>

        <div className={classes.answerformcontainer}>
          <div className={classes.err}>{err}</div>
          <form
            action=""
            className={classes.answerform}
            onSubmit={handleSubmit}
          >
            <textarea
              name="answer"
              className={classes.answerformmsg}
              placeholder="Provide your answer ..."
              value={answerpost.answer}
              onChange={handleChange}
              required
            ></textarea>
            <button className={classes.answerPostbtn}>Post Question</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Answercard;
