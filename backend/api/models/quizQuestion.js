import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  quiz_id: { type: String, required: true },
  question_id: { type: Number, required: true },
  question_title: { type: String },
  question_type: { type: String, required: true },
  option_1: { type: String },
  option_2: { type: String },
  option_3: { type: String },
  option_4: { type: String },
  correct_option: { type: Number },
  textual_ques_marks: { type: Number },
  min_char: { type: Number },
  keywords: [
    {
      type: String,
    },
  ],
});

const model = mongoose.model("QuizQuestion", Schema);

export default model;
