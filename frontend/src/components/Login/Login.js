import React from "react";
import "./../scss/Login.scss";
import validator from "validator";
import swal from "sweetalert";
import md5 from "md5";
import sha1 from "sha1";

function Login({ setLogin, userType, setUserType }) {
    //Initialise email and password
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    //Handle input changes
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    //validations
    const validatePassword = () => {
        return validator.isLength(password, { min: 5 });
    };

    const validateEmail = () => {
        return validator.isEmail(email);
    };

    //Hash password using md5 and sha1 algorithms
    const encrypt = (password) => {
        return md5(sha1(password));
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

    //Register the user and redirect to home
    const registerUser = async () => {
        if (!validateEmail() || !validatePassword()) {
            swal({
                title: "Invalid Form",
                text: "Please ensure to fill all fields correctly",
                icon: "error",
                button: "Ok",
            });
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
                localStorage.setItem("token", JSON.stringify(response.token));
                window.location.href = "/home";
            }, 2000);
        }
    };
    return (
        <>
            <div className="register">
                {/* Div to push the register link to the end of the page */}
                <div></div>
                {/* Registration link */}
                <div
                    className="f3 clickable black pa4"
                    onClick={() => setLogin()}
                >
                    Register
                </div>
            </div>
            {/* LogIn Component with tachyons styles */}
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-40-l mw6 shadow-5 center background serif">
                <main className="pa4 black-80 w-100">
                    <p className="p2 f2 center navy">Welcome Back</p>
                    <p className="pa2 center p3 f4">
                        Log in as a student or a teacher ?
                    </p>
                    <div className="center pa2">
                        {/* Student checkbox slider */}
                        <div className="pa2 f3 center">
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    id="checkbox-1"
                                    className="switch-input"
                                    // set the checked flag based on user selection
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
                        {/* Teacher checkbox slider */}
                        <div className="pa2 f3 center">
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
                    {/* Email */}
                    <div className="mt3 pa2">
                        <label
                            className="db fw6 lh-copy f6"
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
                        />
                    </div>
                    {/* Password */}
                    <div className="mv3 pa2">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            name="password"
                            id="password"
                            onChange={onChangePassword}
                        />
                    </div>
                    {/* Log In button */}
                    <button
                        className="f6 link dim br3 ba bw1 ph3 pv2 dib black-80 background"
                        onClick={registerUser}
                    >
                        Log In
                    </button>
                </main>
            </article>
        </>
    );
}

export default Login;
