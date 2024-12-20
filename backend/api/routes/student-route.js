import express from "express";
import * as StudentController from "./../controllers/student-controller.js";

const router = express.Router();

//Student is set in the index. Nesting under it
router.route("/").get(StudentController.get).post(StudentController.post);
router.route("/login").post(StudentController.login);
router.route("/update/:id").put(StudentController.update);

//Nesting with id
router.route("/:id").get(StudentController.getSpecific);

export default router;
