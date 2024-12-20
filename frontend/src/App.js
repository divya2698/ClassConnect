import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Note from "./components/Notes/Notes";
import Course from "./components/Course/Course";
import ParticlesBg from "particles-bg";
import "tachyons";
import "./App.scss";
import "./../src/components/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainerCustom} from "./../src/components/Toast";

function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/home"
          element={
            <>
              <Home />
              <Sidebar />
            </>
          }
          exact
        />
        <Route
          path="/courses"
          element={
            <>
              <Course />
              <Sidebar />
            </>
          }
        ></Route>
        <Route
          path="/notes"
          element={
            <>
              <Note />
              <Sidebar />
            </>
          }
          exact
        />
        <Route
            path="/course/*"
            element={
                <>
                    <Course />
                    <Sidebar />
                </>
            }
            exact
        />
      </Routes>
    </div>
  );
}

export default App;
