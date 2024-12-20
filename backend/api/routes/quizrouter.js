import express from "express";
import * as quizController from "./../controllers/quizController.js";

const Router = express.Router();

Router.route("/quiz").post(quizController.newQuiz);
Router.route("/quizQuestion").post(quizController.newQuestion);
Router.route("/submitQuiz").post(quizController.submitQuiz);
Router.route("/quiz/:id").get(quizController.fetchQuiz);
Router.route("/questions/:id").get(quizController.getAllQuestions);
Router.route("/quizResult/:id").get(quizController.getQuizResult);
Router.route("/startQuiz/:id").post(quizController.startQuiz);
Router.route("/endQuiz/:id").post(quizController.endQuiz);
Router.route("/quiz/course/:id").get(quizController.getQuizByCourse);
Router.route("/quiz/hasSubmitted/:quizId/:studentId").get(
  quizController.quizSubmittion
);
Router.route("/deleteQuiz/:id").post(quizController.deleteQuiz);
Router.route("/deleteQuestion/:id").post(quizController.deleteQuestion);
Router.route("/deleteSubmission/:id").post(quizController.deleteSubmission);
Router.route("/quiz/changeName/:id").post(quizController.changeQuizName);

export default Router;
