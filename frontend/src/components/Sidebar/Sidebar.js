import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  X,
  BookOpen,
  Settings,
  LogOut,
  Edit3,
  Layout,
  Search,
  User,
} from "react-feather";
import { customStyles, customStyles2 } from "./../CustomModalStyles";
import "./../scss/Sidebar.scss"
let width = window.innerWidth * 0.2;
let height = window.innerHeight * 2;

const Sidebar = () => {
  localStorage.setItem(
    "theme",
    JSON.stringify(document.documentElement.style.getPropertyValue("--theme"))
  );

    const a = localStorage.getItem("userDetails");
    const b = localStorage.getItem("user_type");
    const userType = b ? JSON.parse(b) : JSON.parse(localStorage.getItem("user_type"));

  const [user, setUser] = useState(
    a
      ? JSON.parse(a)
      : {
          department: "",
          firstname: "",
          lastname: "",
          email: "",
          _id: "",
        }
  );
  const [sidebar, setSidebar] = useState(false);

  const [modalIsOpen, setModal] = useState(false);
  const [modalIsOpenProfile, setModalProfile] = useState(false);
  const [courses, setCourses] = React.useState([]);

  const showSidebar = () => setSidebar(!sidebar);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const openModalProfile = () => setModalProfile(true);
  const closeModalProfile = () => setModalProfile(false);

  function GetCurrentPath() {
    return useLocation().pathname;
  }

  React.useEffect(() => {
    fetch(`http://localhost:4000/${userType}/${user._id}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("Could not fetch user");
        }
      })
      .then((data) => {
        setUser(data.data);
      })

      .catch(() => console.log("Could not fetch user"));
  }, [modalIsOpen]);

  // React.useEffect(() => {
  //     if (userType === "teacher") return;
  //     Axios.get(`/api/fetchCourse/student/${user._id}`, {
  //         header: {
  //             "Content-Type": "application/json; charset=utf-8",
  //         },
  //     })
  //         .then((res) => {
  //             if (res.data.success) {
  //                 setCourses(res.data.data);
  //             } else {
  //                 console.log("Error fetching courses");
  //             }
  //         })
  //         .catch(() => {
  //             console.log("Could not fetch your courses. Please try again");
  //         });
  // }, [modalIsOpen]);

  // React.useEffect(() => {
  //     if (userType === "student") return;
  //     Axios.get(`/api/fetchCourse/teacher/${user._id}`, {
  //         header: {
  //             "Content-Type": "application/json; charset=utf-8",
  //         },
  //     })
  //         .then((res) => {
  //             if (res.data.success) {
  //                 setCourses(res.data.data);
  //             } else {
  //                 console.log("Error fetching courses");
  //             }
  //         })
  //         .catch(() => {
  //             console.log("Could not fetch your courses. Please try again");
  //         });
  // }, [modalIsOpen]);

  const menuOptions = [
    {
      title: "Dashboard",
      icon: <Layout size={22} />,
      path: "/home",
    },
    {
      title: "My Notes",
      icon: <Edit3 size={20} style={{ marginRight: 22 }} />,
      path: "/notes",
    },
  ];

  const [newfirstname, setNewfirstname] = useState(user.firstname);
  const [newlastname, setNewlastname] = useState(user.lastname);

  const changeName = () => {
    if (!newfirstname.length || !newlastname) {
      return toast.error("Name fields cannot be empty");
    }
    const item = {
      firstname: newfirstname,
      lastname: newlastname,
    }
    fetch(`http://localhost:4000/${userType}/update/${user._id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item),
      
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("user name updated");
        } else {
          toast.error("Unable to update");
        }
      })
      .catch(() => toast.error("Unable to update"));
    closeModal();
    reloadPage();
  };

  const sidebarData = courses.length ? courses : [];

  const reloadPage = () => {
    window.location.reload();
  };

  const logout = () => {
    window.localStorage.clear();
  };

  return (
    <div>
      <div className="sidebar">
        <div className="settings-icon">
          <Settings size={21} className="seticon" onClick={openModal} />
        </div>

                <div className="my-profile-box">
                    <div className="profile" onClick={openModalProfile}>
                        <User />
                    </div>
                    <div className="details">
                        <h6>
                            {user.firstname} {user.lastname}
                        </h6>
                        <p>
                            {userType}
                        </p>
                    </div>
                </div>
            </div>

            <nav className={"nav-menu active"}>
                <Scrollbars
                    style={{ width, height }}
                    autoHide
                    autoHideDuration={1000}
                    autoHideTimeout={800}
                    renderThumbVertical={({ style, ...props }) => (
                        <div
                            {...props}
                            className="subBG"
                            style={{
                                ...style,
                            }}
                        />
                    )}
                >
                    <div
                        onClick={showSidebar}
                        className="nav-menu-items justify-content-center justify-items-center"
                    >
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <div className="logo">
                                <BookOpen size={30} color="rgb(25, 147, 147)" />
                                <div>
                                    <p className="logo-text">Study Buddy</p>
                                </div>
                            </div>
                        </Link>

            <br
              style={{
                display: GetCurrentPath() === "/home" ? "block" : "none",
              }}
            />

            <div
              className="nav-barr"
              style={{
                display: GetCurrentPath() === "/home" ? "none" : "block",
              }}
            >
              <div className="flex-row">
                <div className="profile" onClick={openModalProfile}>
                  <User />
                </div>
                <div className="details">
                  <p className="greetings">Hey,</p>
                  <p className="greetings">
                    {user.firstname} {user.lastname}
                  </p>
                </div>
              </div>
              <div className="sets">
                <div className="profile-option" onClick={openModal}>
                  <Edit3 size={15} />
                  <p className="sub">Edit profile</p>
                </div>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="profile-option" onClick={logout}>
                    <LogOut size={15} className="changeColor" />
                    <p className="sub">Logout</p>
                  </div>
                </Link>
              </div>
            </div>

                        {menuOptions.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
                                        key={index}
                                        className="nav-text"
                                        style={{
                                            borderColor:
                                                GetCurrentPath() === item.path
                                                    ? "rgb(25, 147, 147)"
                                                    : "transparent",
                                        }}
                                    >
                                        <span
                                            className="row"
                                            style={{
                                                color:
                                                    GetCurrentPath() ===
                                                    item.path,
                                            }}
                                        >
                                            {item.icon}
                                        </span>
                                        <span
                                            className="row"
                                            style={{
                                                color:
                                                    GetCurrentPath() ===
                                                    item.path,
                                            }}
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}

            {sidebarData.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/course/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div key={index} className="nav-text">
                    <span
                      className="row"
                      style={{
                        color: GetCurrentPath() === `/course/${item._id}`,
                      }}
                    >
                      {" "}
                      {item.name}{" "}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Scrollbars>
      </nav>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        closeTimeoutMS={200}
        className="background"
      >
        <X size={25} color="#ababab" onClick={closeModal} />

        <h2 className="info-right">Settings</h2>

        <p className="p-name">Change First Name</p>
        <input
          className="text"
          type="text"
          value={newfirstname}
          onChange={(t) => setNewfirstname(t.target.value)}
        ></input>

        <p className="p-name">Change Last Name</p>
        <input
          className="text"
          type="text"
          value={newlastname}
          onChange={(t) => setNewlastname(t.target.value)}
        ></input>

                <div className="change-edit">
                    <button onClick={changeName} className="save">
                        <p >Save</p>
                    </button>
                    <button onClick={closeModal} className="save">
                        <p >Cancel</p>
                    </button>
                </div>
            </Modal>

      <Modal
        isOpen={modalIsOpenProfile}
        onRequestClose={closeModalProfile}
        style={customStyles2}
        contentLabel="Modal"
        closeTimeoutMS={200}
        className="background"
        ariaHideApp={false}
      >
        <X size={25} color="#ababab" onClick={closeModalProfile} />

        <div className="changeColorBG-profile">
          <User />
        </div>

        <p className="changeColor-pp">
          {user.firstname.concat(" ").concat(user.lastname)}
        </p>

        <div className="info">
          <p className="info-left">EMAIL</p>
          <p className="info-right">{user.email} </p>
        </div>

        {userType === "student" ? (
          <React.Fragment>
            <div className="info">
              <p className="info-left">DEPARTMENT</p>
              <p className="info-right">{user.department} </p>
            </div>
            <div className="info">
              <p className="info-left">COURSES ENROLLED</p>
              <p className="info-right">{courses.length} courses </p>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="info">
              <p className="info-left">COURSES TEACHING</p>
              <p className="info-right">{courses.length} courses </p>
            </div>
          </React.Fragment>
        )}
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="info" onClick={logout}>
            Log out
          </p>
        </Link>
      </Modal>
    </div>
  );
};

export default Sidebar;
