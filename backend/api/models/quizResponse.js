import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  quiz_id: { type: String, required: true },
  student_id: { type: String, required: true },
  student_name: { type: String },
  no_of_questions: { type: Number },
  questions_attempted: { type: Number },
  total_marks: { type: Number },
  marks_obtained: { type: Number },
});

const model = mongoose.model("QuizResponse", Schema);

export default model;
