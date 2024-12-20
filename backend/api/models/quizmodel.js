import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    course_id: { type: String, required: true },
    teacher_id: { type: String, required: true },
    quiz_title: { type: String },
    is_active: { type: Boolean },
    total_marks: { type: Number },
    no_of_questions: { type: Number },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Quiz", Schema);

export default model;
