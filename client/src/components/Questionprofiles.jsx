import React, { useState, useEffect } from "react";
import classes from "./stylecomponent/questioncomp.module.css";
import { Link } from "react-router-dom";
import UserIcon from "../components/UserIcon";
function Questionprofiles({ data, username, index, separator }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );

    useEffect(() => {
      const media = window.matchMedia(query);
      const handler = () => setMatches(media.matches);
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }, [query]);

    return matches;
  };

  const isMobile = useMediaQuery("(max-width: 450px)");
  const iconSize = isMobile ? 30 : 50;

  return (
    <>
      <div className={classes.question_container}>
        <Link
          to={`/question/${data.questionid}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            className={classes.question_content}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="icon-wrapper">
              <UserIcon
                bgColor={hoveredIndex === index ? "#09244B" : "#fff"}
                fill={hoveredIndex === index ? "#fff" : "#09244B"}
                size="50"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              />
              <div className={classes.username}>{username || "Loading..."}</div>
            </div>
            <p className={classes.question_answer}>
              {separator ? data.answer : data.title}
            </p>
            <div className={classes.svgfornext}>
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M9 7L14 12L9 17"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Questionprofiles;
