import React, { useState, useContext } from "react";
import { Appstate } from "../App";
import classes from "./styling/question.module.css";
import axiosbase from "../axiosconfig";
import Select from "react-select";
import "./styling/customselect.css";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../components/alerthelper";

function Question() {
  const { user } = useContext(Appstate);
  const navigate = useNavigate();
  const [err, seterr] = useState("");

  const tagOptions = [
    { value: "Math 1201 College algebra", label: "Math 1201 College algebra" },
    { value: "Programming Fundamental", label: "Programming Fundamental" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Programming 2", label: "Programming 2" },
    { value: "Digital Electronics", label: "Digital Electronics" },
    { value: "Programing 1 (Java)", label: "Programing 1 (Java)" },
    { value: "DataBases 1 (CS 2203)", label: "DataBases 1 (CS 2203)" },
    {
      value: "Introduction to Statistics",
      label: "Introduction to Statistics",
    },
    { value: "UoPeople Health Science", label: "UoPeople Health Science" },
    {
      value: "Introduction to Psychology",
      label: "Introduction to Psychology",
    },
    {
      value: "Emotional Intelligence (EI)",
      label: "Emotional Intelligence (EI)",
    },
    { value: "English Composition 2", label: "English Composition 2" },
    {
      value: "Univ 1001 (online education strategy)",
      label: "Univ 1001 (online education strategy)",
    },
    {
      value: "POLS 1503-01 (Globalization)",
      label: "POLS 1503-01 (Globalization)",
    },
    { value: "Business 1101", label: "Business 1101" },
    { value: "Introduction to Economics", label: "Introduction to Economics" },
    {
      value: "SOC 1502-01 Introduction to Sociology",
      label: "SOC 1502-01 Introduction to Sociology",
    },
    { value: "Introduction to Biology", label: "Introduction to Biology" },
    {
      value: "PHIL 1404 Introduction to Global Ethics",
      label: "PHIL 1404 Introduction to Global Ethics",
    },
    {
      value: "Introduction to Environmental Sciences",
      label: "Introduction to Environmental Sciences",
    },
    {
      value: "PHIL 1404 Introduction to Global Ethics",
      label: "PHIL 1404 Introduction to Global Ethics",
    },
    {
      value: "Introduction to Environmental Sciences",
      label: "Introduction to Environmental Sciences",
    },
    {
      value: "CS 2401 - Software Engineering 1",
      label: "CS 2401 - Software Engineering 1",
    },
    { value: "Algorithm", label: "Algorithm" },
    { value: "OPERATING", label: "OPERATING" },
    {
      value: "CS 2301 Operating Systems 1",
      label: "CS 2301 Operating Systems 1",
    },
    { value: "BUS 2202-01 E-commerce", label: "BUS 2202-01 E-commerce" },
    { value: "BUS 1101", label: "BUS 1101" },
    {
      value: "Master of Information technology",
      label: "Master of Information technology",
    },
    {
      value: "BUS 4407-01 Strategic Management",
      label: "BUS 4407-01 Strategic Management",
    },
    {
      value: "BUS 4403-01 Business Policy",
      label: "BUS 4403-01 Business Policy",
    },
    { value: "Basic accounting", label: "Basic accounting" },
    { value: "BUS 1103- Microeconomics", label: "BUS 1103- Microeconomics" },
    { value: "Macroeconomics", label: "Macroeconomics" },
  ];
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      border: "1.2px solid rgb(149, 149, 149)",
      borderRadius: "5px",
      padding: "0px 5px",
      height: "25px",
      minHeight: "25px",
      fontSize: "14px",
      boxShadow: "none",
      marginBottom: "3px",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        borderColor: "rgb(120,120,120)",
      },
    }),

    placeholder: (base) => ({
      ...base,
      fontSize: "12px",
      marginLeft: "7px",
      marginBottom: "5px",
      overflow: "hidden",
      gridArea: "auto",
    }),

    singleValue: (base) => ({
      ...base,
      fontSize: "13px",
      marginLeft: "8px",
      lineHeight: "1",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0",
      height: "25px",
      alignItems: "center",
    }),

    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      height: 0,
      opacity: 0,
      pointerEvents: "none",
    }),

    indicatorsContainer: () => ({
      display: "none",
    }),

    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      padding: "3px",
      marginTop: "0px",
      fontSize: "12px",
    }),

    menuList: (base) => ({
      ...base,
      padding: "0px",
      maxHeight: "120px",
    }),

    option: (base, state) => ({
      ...base,
      fontSize: "12px",
      padding: "6px 8px",
      margin: "2px 0",
      backgroundColor: state.isSelected
        ? "#0b7ae2"
        : state.isFocused
        ? "#e6f7ff"
        : "transparent",
      borderRadius: "5px",
      color: state.isSelected ? "white" : "black",
      cursor: "pointer",
    }),
  };

  const [questpost, setquestpost] = useState({
    title: "",
    description: "",
    tag: null,
  });
  // console.log(questpost.tag);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setquestpost({
      ...questpost,
      [name]: value,
    });
  };
  const token = localStorage.getItem("token");
  async function handleSubmit(e) {
    e.preventDefault();

    if (!questpost.tag) {
      seterr("*Select tag");
      return;
    } else if (!questpost.title) {
      seterr("*Enter title");
      return;
    } else if (!questpost.description) {
      seterr("*Enter description");
      return;
    }

    if (!user?.userid) {
      console.error("User ID missing — cannot submit question.");

      return;
    }
    try {
      await axiosbase.post(
        "/questions/question",
        {
          title: questpost.title,
          description: questpost.description,
          userid: user?.userid,
          tag: questpost.tag,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      showSuccessAlert(
        "Your Question Posted Successful!",
        "Click OK to continue",
        () => {
          navigate("/home");
        }
      );
      setquestpost({
        title: "",
        description: "",
        tag: null,
      });
      seterr("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {" "}
      <div className={classes.breadcrumbs}>
        <Link to="/home">Home</Link>
        <Link>/</Link>
        <Link to="/question">Ask-Question</Link>
      </div>
      <div className={classes.questionLayout}>
        <div className={classes.questionContainer}>
          <div className={classes.questionrules}>
            <h1>Steps To Write A Good Question.</h1>
            <p className={classes.questionIconWrapper}>
              <span className={`material-symbols-outlined ${classes.iconni}`}>
                arrow_circle_right
              </span>
              Summerize your problems in a one-line-title.
            </p>
            <p className={classes.questionIconWrapper}>
              <span className={`material-symbols-outlined ${classes.iconni}`}>
                arrow_circle_right
              </span>
              Describe your problem in more detail.
            </p>
            <p className={classes.questionIconWrapper}>
              <span className={`material-symbols-outlined ${classes.iconni}`}>
                arrow_circle_right
              </span>
              Describe what you tried and what you expected to happen.
            </p>
            <p className={classes.questionIconWrapper}>
              <span className={`material-symbols-outlined ${classes.iconni}`}>
                arrow_circle_right
              </span>
              Review your question and post it here.
            </p>
          </div>

          <div className={classes.questformcontainer}>
            <div className={classes.postquestion}>Post Your Question</div>
            <div className={classes.err}>{err}</div>
            <Select
              options={tagOptions}
              placeholder="Select your course"
              value={
                tagOptions.find((option) => option.value === questpost.tag) ||
                null
              }
              onChange={(selectedOption) =>
                setquestpost({ ...questpost, tag: selectedOption?.value || "" })
              }
              styles={customStyles}
              classNamePrefix="customselect"
              required
            />

            <form
              action=""
              className={classes.questionform}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="title"
                placeholder="Question title"
                value={questpost.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                className={classes.questionformmsg}
                placeholder="Question detail ..."
                value={questpost.description}
                onChange={handleChange}
                required
              ></textarea>
              <button className={classes.questionPostbtn}>Post Question</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
