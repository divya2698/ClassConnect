import express from "express";
import * as TeacherController from "./../controllers/teacher-controller.js";

const router = express.Router();

//Teacher is set in the index. Nesting under it
router.route("/").get(TeacherController.get).post(TeacherController.post);
router.route("/login").post(TeacherController.login);
router.route("/update/:id").put(TeacherController.update);

//Nesting with id
router.route("/:id").get(TeacherController.getSpecific);
// router.route("/:id").put(todoController.put).delete(todoController.remove);

export default router;
