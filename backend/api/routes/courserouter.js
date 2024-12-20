import express from "express";
import * as courseController from "./../controllers/courseController.js";

const Router = express.Router();

Router.route("/course").post(courseController.newCourse);

Router.route("/course/:id")
    .get(courseController.courseByID)
    .delete(courseController.deleteCourse);

Router.route("/fetchCourse/teacher/:id").get(courseController.courseByTeacher);

Router.route("/enrollStudent").post(courseController.enrollStudent);

Router.route("/fetchCourse/student/:id").get(courseController.allCourses);

Router.route("/studentCount/:id").get(courseController.studentCount);

Router.route("/course/students/:id").get(courseController.allStudentsInCourse);

Router.route("/checkCourse").post(courseController.validCourseCheck);

Router.route("/records").post(courseController.createRecord);

// Router.route("/search/:id").post(courseController.findStudentsInCourse);

Router.route("/removeStudent").post(courseController.removeStudentFromCourse);

Router.route("/course/changeName/:id").post(courseController.updateCourse);

export default Router;
