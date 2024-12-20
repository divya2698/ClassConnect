import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  user_id: { type: String, required: true },
  user_type: { type: String, required: true },
  user_name: { type: String, required: true },
  message_content: { type: String, required: true },
  course_id: { type: String, required: true },
  time_stamp: { type: String, required: true },
});

const model = mongoose.model("Message", Schema);

export default model;
