import express from "express";

import * as noteController from "./../controllers/notesController.js";

const Router = express.Router();

Router.route("/").post(noteController.newNote);
Router.route("/:user_type/:id").get(noteController.notes)
Router.route("/:id").delete(noteController.deleteNote);

export default Router; 