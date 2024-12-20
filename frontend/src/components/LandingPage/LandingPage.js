import React from "react";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import "./../scss/LandingPage.scss";

function LandingPage() {
    //Checks if the user is in login or registration state
    const [islogin, setLogin] = React.useState(true);
    //Checks if the user is student or teacher state
    const [userType, setUserType] = React.useState({ userType: "student" });
    return (
        <div>
            {islogin ? (
                <Login
                    setLogin={setLogin}
                    userType={userType}
                    setUserType={setUserType}
                />
            ) : (
                <Registration
                    setLogin={setLogin}
                    userType={userType}
                    setUserType={setUserType}
                />
            )}
        </div>
    );
}

export default LandingPage;
