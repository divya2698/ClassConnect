import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  student_id: { type: String, required: true },
  course_id: { type: String, required: true },
});

const model = mongoose.model("Record", Schema);

export default model;
