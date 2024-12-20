import React from "react";
import "./../scss/Home.scss";
import { User } from "react-feather";
import EmptyState from "../Course/EmptyState";
import CreateCourse from "./../Course/CreateCourse";
import CourseCard from "../Course/CourseCard"
let user = JSON.parse(localStorage.getItem("userDetails"));
let userType = JSON.parse(localStorage.getItem("user_type"));

let { _id, department } = user ? user : {_id: "1",department: "SWES"};

const MyCourses = () => {
    const [courses, setCourses] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState(null);
    const [courseTeachers, setCourseTeachers] = React.useState([]);
    const [studentCount, setStudentCount] = React.useState([]);
    const [temp, update] = React.useState(0);

    const forceUpdate = React.useCallback(() => update((v) => v + 1), []);

    React.useEffect(() => {
        fetch(`http://localhost:4000/${userType}/${_id}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error("Encountered issue while fetching information");
                }
            })
            .then((data) => {
                setUserInfo(data);
            })
            .catch((error) => {
                console.log(error);
            });

        fetch(`http://localhost:4000/api/fetchCourse/${userType}/${_id}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error("Encountered issue while fetching information");
                }
            })
            .then((data) => {
                if(data.data) {
                    setCourses(data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [temp]);

    React.useEffect(() => {
        getCourseTeachers();
        getTotalStudents();
    }, [courses]);

    const getCourseTeachers = () => {
        let teacherArray;
        console.log("test", courses);
        if (courses.length !== 0 && courses.length !== undefined) {
            courses.map((item, index) => {
                fetch(`http://localhost:4000/teacher/${item.teacher_id}`)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw Error("Encountered issue while saving");
                        }
                    })
                    .then((data) => {
                        if (data.firstname !== undefined) {
                            teacherArray[index] =
                                data.firstname + " " + data.lastname;
                            setCourseTeachers(teacherArray);
                        }
                    })
                    .catch(() => console.log("error"));
            });
        }
    };

    const getTotalStudents = () => {
        let studentCountArray;
        if (courses.length !== 0 && courses.length !== undefined) {
            courses.map((item, index) => {
                fetch(`http://localhost:4000/api/studentCount/${item._id}`)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw Error("Encountered issue while saving");
                        }
                    })
                    .then((data) => {
                        if (data.firstname !== undefined) {
                            studentCountArray[index] = data.count;
                            setStudentCount(studentCountArray);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    };

    return (
        <div className="course-container">
            <div className="course-containerr">
                <div className="user-logo">
                    <User className="icon-home" />
                </div>
                <div className="ml1">
                    <h2 className="changeColor">
                        {user.firstname} {user.lastname}
                    </h2>
                    <p className="subject">
                        {userType === "student" ? "Student" : "Teacher"}
                    </p>
                    <p className="sub-dept">{department}</p>
                </div>
            </div>
            <p
                className="sub-course"
            >
                MY COURSES
            </p>
            <div className="pl5">{courses.length ? null || courses === undefined: <EmptyState />}</div>
            <div className="my-courses-box pl5">
            {(courses.length !== 0)
                ? courses.map((course, index) => {
                    return (
                        <CourseCard
                        userInfo={userInfo}
                        userType={userType}
                        courseID={course._id}
                        key={index}
                        courseTitle={course.name}
                        dept={course.department}
                        teacher={courseTeachers[index]}
                        numberOfStudents={studentCount[index]}
                        />
                    );
                    })
                : null}
            </div>
            <CreateCourse reload={forceUpdate} />
        </div>
        
    );
};

export default MyCourses;
