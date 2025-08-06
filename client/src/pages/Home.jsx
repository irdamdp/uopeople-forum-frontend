import { useContext, useEffect, useState } from "react";
import { Appstate } from "../App";
import classes from "./styling/home.module.css";
import { Link } from "react-router-dom";
import axiosbase from "../axiosconfig";

import Questionprofiles from "../components/Questionprofiles";
function Home() {
  const { user } = useContext(Appstate);
  console.log(user);
  const [usernames, setUsernames] = useState({});
  const [allquest, setallquest] = useState([]);

  useEffect(() => {
    axiosbase
      .get("/questions/home", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(async (res) => {
        const questions = res.data;
        setallquest(questions);

        // Get unique userids from questions
        const uniqueUserIds = [...new Set(questions.map((q) => q.userid))];

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

  return (
    <>
      <div className={classes.container}>
        <div className={classes.container_home}>
          <div className={classes.container_homein}>
            <Link to="/question">
              <button className={classes.ask_btn}>Ask question</button>
            </Link>

            <h2 className={classes.welcome}>
              WellCome : <span>{user.username}</span>{" "}
            </h2>
          </div>
        </div>
        <div>
          <div>
            {allquest.map((quest, index) => {
              return (
                <Questionprofiles
                  key={index}
                  data={quest}
                  username={usernames[quest.userid]}
                  separator={false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
