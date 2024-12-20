import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    department: { type: String, required: true },
    teacher_id: { type: String, required: true },
    course_code: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Course", Schema);

export default model;
