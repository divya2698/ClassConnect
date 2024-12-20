import React from "react";
import { Link } from "react-router-dom";
import {User} from "react-feather";
import { getRandomColor } from "./random";

const CourseCard = ({
  userType,
  userInfo,
  courseID,
  courseTitle,
  dept,
  teacher,
  numberOfStudents,
}) => {
  let deptF = dept.toUpperCase();
  const color = getRandomColor();

  const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  if (userType === "teacher") {
    teacher = userInfo
      ? titleCase(`${userInfo.firstname} ${userInfo.lastname}`)
      : null;
  }

  return (
    <Link to={`/course/${courseID}`}>
      <div className="course-box">
        <div className="course-box-top" style={{ backgroundColor: color }}>
          <h3>{courseTitle}</h3>
          <h6>
            {deptF}
          </h6>
        </div>
        <div className="course-box-bottom" style={{ borderTopWidth: 0 }}>
          <div className="instructor-box" style={{ marginTop: 5 }}>
            <div
              className="changeColorBG"
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
                backgroundColor: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexDirection: "row",
              }}
            >
             <User />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "#878787",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  margin: 0,
                  padding: 0,
                  letterSpacing: 0.4,
                }}
              >
                INSTRUCTOR
              </p>
              <h6
                className="sub"
                style={{
                  fontSize: 15.5,
                  color: "#232323",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  margin: 0,
                  padding: 0,
                }}
              >
                {teacher}
              </h6>
            </div>
          </div>

          <div className="students-box">
            <div
              className="students-box-circle"
              style={{ marginLeft: 0, background: "#6C63FF" }}
            >
              <User />
            </div>
            <div
              className="students-box-circle"
              style={{
                marginLeft: 17,
                background: "#0F98D9",
                transform: "scale(1.02)",
              }}
            >
              <User />
            </div>
            <div
              className="students-box-circle"
              style={{
                marginLeft: 34,
                background: "#545454",
                transform: "scale(1.05)",
              }}
            >
              <User />
            </div>
            <p
              className="sub"
              style={{
                marginLeft: 70,
                fontFamily: "Poppins",
                fontSize: 13,
                color: "#434343",
                fontWeight: 500,
                marginTop: 30,
              }}
            >
              {numberOfStudents} student(s) enrolled
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
