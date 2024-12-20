import React from "react";
import validator from "validator";
import { InputLabel, MenuItem, Select } from "@mui/material";
import swal from "sweetalert";
import md5 from "md5";
import sha1 from "sha1";
//Department Map
export const departments = [
    {
        value: "SWES",
        label: "Software Engineering Systems",
    },
    {
        value: "CS",
        label: "Computer Science",
    },
    {
        value: "IS",
        label: "Information Systems",
    },
    {
        value: "DAMG",
        label: "Data Architecture And Management",
    },
    {
        value: "CPS",
        label: "Cyber Physical Systems",
    },
];

function Registration({ setLogin, userType, setUserType }) {
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    //Handle input changes
    const onChangeFirstname = (e) => setFirstname(e.target.value);
    const onChangeLastname = (e) => setLastname(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    //Set student department
    const [studentDepartment, setStudentDepartment] = React.useState(
        departments[0].value
    );

    //Simple validations for fields
    const validateName = (name) => {
        return !validator.isEmpty(name) && validator.isAlpha(name);
    };

    const validatePassword = () => {
        return validator.isLength(password, { min: 5 });
    };

    const validateEmail = () => {
        return validator.isEmail(email);
    };

    // Handle change in student department
    const handleChange = (e) => {
        setStudentDepartment(e.target.value);
    };

    //Hash password using md5 and sha1 algorithms
    const encrypt = (password) => {
        return md5(sha1(password));
    };

    //Add user to db
    const addUser = async () => {
        let fetchFunc;
        if (userType === "student") {
            fetchFunc = fetch("http://localhost:4000/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: encrypt(password),
                    department: studentDepartment,
                }),
            });
        } else {
            fetchFunc = fetch("http://localhost:4000/teacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: encrypt(password),
                }),
            });
        }
        const data = fetchFunc
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    //Handle errors
                    throw Error("Encountered issue while saving");
                }
            })
            .then((data) => {
                //Check if data contains the error object
                if (data.errors) {
                    const errMessage = data.message;
                    const errTitle = data.name;
                    swal({
                        title: errTitle,
                        text: errMessage,
                        icon: "error",
                        button: "Ok",
                    });
                    return null;
                }
                return data;
            })
            .catch((err) => {
                //catch errors
                const errMessage = err.message;
                const errTitle = err.name;
                swal({
                    title: errTitle,
                    text: errMessage,
                    icon: "error",
                    button: "Ok",
                });
                return null;
            });
        return data;
    };

    //Sign the user in and authenticate user
    const loginUser = async () => {
        const fetchFunc =
            userType === "student"
                ? fetch("http://localhost:4000/student/login", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          email: email,
                          password: encrypt(password),
                      }),
                  })
                : fetch("http://localhost:4000/teacher/login", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          email: email,
                          password: encrypt(password),
                      }),
                  });
        const data = fetchFunc
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw Error("Encountered issue while saving");
                }
            })
            .then((data) => data);
        return data;
    };

    //Register User - field validations and route to home screen
    const registerUser = async () => {
        if (
            !validateEmail() ||
            !validatePassword() ||
            !validateName(firstname) ||
            !validateName(lastname)
        ) {
            swal({
                title: "Invalid Form",
                text: "Please ensure to fill all fields correctly",
                icon: "error",
                button: "Ok",
            });
        } else {
            const data = await addUser();
            if (data === null) {
                return;
            } else {
                const response = await loginUser();
                swal({
                    title: "Success!",
                    text: "You have registered successfully!",
                    icon: "success",
                });
                setTimeout(() => {
                    //Add student details
                    if (response.student) {
                        localStorage.setItem(
                            "userDetails",
                            JSON.stringify(response.student)
                        );
                        localStorage.setItem(
                            "user_type",
                            JSON.stringify("student")
                        );
                    } //Add teacher details
                    else {
                        localStorage.setItem(
                            "userDetails",
                            JSON.stringify(response.teacher)
                        );
                        localStorage.setItem(
                            "user_type",
                            JSON.stringify("teacher")
                        );
                    }
                    //Store jwt token
                    localStorage.setItem(
                        "token",
                        JSON.stringify(response.token)
                    );
                    window.location.href = "/home";
                }, 2000);
            }
        }
    };

    return (
        <>
            <div className="login">
                {/* Div to push the LogIn link to the end of the page */}
                <div></div>
                {/* LogIn link */}
                <div
                    className="f3 clickable black pa4"
                    onClick={() => {
                        setLogin(true);
                    }}
                >
                    Login
                </div>
            </div>
            {/* Registration Component with tachyons styles */}
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-40-l mw6 shadow-5 center background serif">
                <main className="pa3 black-80 w-100">
                    <p className="p2 f2 center di navy">
                        Welcome To Study Buddy!
                    </p>
                    <p className="pa2 center p3 f4">
                        Register as a student or a teacher ?
                    </p>
                    <div className="center pa2">
                        {/* Student checkbox slider */}
                        <div className="pa2 f3 center">
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    id="checkbox-1"
                                    className="switch-input"
                                    checked={
                                        userType === "student" ? true : false
                                    }
                                    onChange={() => setUserType("student")}
                                ></input>
                                <label
                                    htmlFor="checkbox-1"
                                    className="switch-label"
                                >
                                    Switch
                                </label>
                            </div>
                            <span>Student</span>
                        </div>
                        <div className="pa2 f3 center">
                            {/* Teacher checkbox slider */}
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    id="checkbox-2"
                                    className="switch-input"
                                    checked={
                                        userType === "teacher" ? true : false
                                    }
                                    onChange={() => setUserType("teacher")}
                                ></input>
                                <label
                                    htmlFor="checkbox-2"
                                    className="switch-label"
                                >
                                    Switch
                                </label>
                            </div>
                            <span>Teacher</span>
                        </div>
                    </div>
                    <p>Required Information</p>
                    <div className="measure flex">
                        {/* Firstname Input */}
                        <div className="pa2">
                            <label
                                htmlFor="firstname"
                                className="f6 db mb2 pa1"
                            >
                                First Name
                            </label>
                            <input
                                id="firstname"
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                onChange={onChangeFirstname}
                                onBlur={() =>
                                    validateName(firstname)
                                        ? null || true
                                        : swal({
                                              title: "Invalid Form",
                                              text: "Firstname must only contain alphabets",
                                              icon: "error",
                                              button: "Ok",
                                          })
                                }
                            ></input>
                        </div>
                        {/* Lastname Input */}
                        <div className="pa2">
                            <label htmlFor="lastname" className="f6 db mb2 pa1">
                                Last Name
                            </label>
                            <input
                                id="lastname"
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                onChange={onChangeLastname}
                                onBlur={() =>
                                    validateName(lastname)
                                        ? null || true
                                        : swal({
                                              title: "Invalid Form",
                                              text: "Lastname must only contain alphabets",
                                              icon: "error",
                                              button: "Ok",
                                          })
                                }
                            ></input>
                        </div>
                    </div>
                    {/* Render department suboption based on whether user is a student or not */}
                    <div>
                        {userType === "student" ? (
                            <div className="mt3 pa2">
                                <InputLabel id="departments" className="b">
                                    Department
                                </InputLabel>
                                <Select
                                    labelId="departments"
                                    id="student-department"
                                    value={studentDepartment}
                                    label="Department"
                                    onChange={handleChange}
                                >
                                    {/* Show Each Department as a select option */}
                                    {departments.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="measure flex">
                        {/* Email */}
                        <div className="mb2 pa2">
                            <label
                                className="f6 db mb2 pa1"
                                htmlFor="email-address"
                            >
                                Email
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={onChangeEmail}
                                onBlur={() =>
                                    validateEmail()
                                        ? null || true
                                        : swal({
                                              title: "Invalid Form",
                                              text: "Please enter a valid email address",
                                              icon: "error",
                                              button: "Ok",
                                          })
                                }
                            />
                        </div>
                        {/* Password */}
                        <div className="mb2 pa2">
                            <label className="f6 db mb2 pa1" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={onChangePassword}
                                onBlur={() =>
                                    validatePassword()
                                        ? null || true
                                        : swal({
                                              title: "Invalid Form",
                                              text: "Password shoud have min 5 characters",
                                              icon: "error",
                                              button: "Ok",
                                          })
                                }
                            />
                        </div>
                    </div>
                    {/* Registration button */}
                    <button
                        className="f6 link dim br3 ba bw1 ph3 pv2 dib black-80 background"
                        onClick={registerUser}
                    >
                        Register
                    </button>
                </main>
            </article>
        </>
    );
}

export default Registration;
